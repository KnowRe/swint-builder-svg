'use strict';

var async = require('async'),
	path = require('path'),
	fs = require('fs'),
	SVGSpriter = require('svg-sprite'),
	swintHelper = require('swint-helper'),
	defaultize = swintHelper.defaultize,
	walk = swintHelper.walk;

module.exports = function(options, callback) {
	defaultize({
		name: 'Project',
		inDir: path.dirname(require.main.filename),
		outDir: path.join(path.dirname(require.main.filename), '../out'),
		walkOption: {
			ext: 'svg'
		}
	}, options);

	return proceed(options, callback);
};

var proceed = function(options, callback) {
	if(callback === undefined) {
		var msg = 'swint-builder-png function needs callback';
		print(4, msg);
		throw new Error(msg);
	}

	if(!fs.existsSync(options.inDir)) {
		callback('swint-builder-png: inDir doesn\'t exist', false);
		return;
	}

	if(!fs.existsSync(options.outDir)) {
		fs.mkdirSync(options.outDir);
	}

	var dirList = fs.readdirSync(options.inDir).filter(function(dir) {
			return fs.lstatSync(path.join(options.inDir, dir)).isDirectory();
		}),
		walkers = dirList.map(function(dir) {
			var walkOption = options.walkOption;
			walkOption.dir = path.join(options.inDir, dir);
			return walk(walkOption);
		});

	async.parallel(
		dirList.map(function(dir, idx) {
			return function(cb) {
				var filePath = walkers[idx],
					spriter = new SVGSpriter({
						dest: options.outDir,
						mode: {
							stack: true
						}
					});

				filePath.forEach(function(file) {
					spriter.add(file, null, fs.readFileSync(file, 'utf-8'));
				});

				spriter.compile(function(err, results) {
					fs.writeFileSync(path.join(options.outDir, dir + '.svg'), results.stack.sprite.contents);
					cb(err, true);
				});
			};
		}),
		function(err) {
			if(err) {
				callback(err, true);
				return;
			}

			callback(null, true);
		}
	);
};
