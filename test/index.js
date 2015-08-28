var os = require('os'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert'),
	swintHelper = require('swint-helper'),
	buildSVG = require('../lib');

describe('builder-svg', function() {
	it('Error when no callback', function() {
		assert.throws(function() {
			buildSVG({});
		});
	});

	it('Error when inDir doesn\'t exist', function(done) {
		buildSVG({
			inDir: '/this-directory-does-not-exist'
		}, function(err, res) {
			assert.notEqual(err, null);
			done();
		});
	});

	it('Simple case', function(done) {
		buildSVG({
			name: 'Test',
			inDir: path.join(__dirname, '../test_case'),
			outDir: path.join(os.tmpdir(), 'swint-builder-svg-out')
		}, function(err, res) {
			assert.deepEqual(
				fs.readFileSync(path.join(__dirname, '../test_result/flags.svg')),
				fs.readFileSync(path.join(os.tmpdir(), 'swint-builder-svg-out/flags.svg'))
			);

			assert.deepEqual(
				fs.readFileSync(path.join(__dirname, '../test_result/tech.svg')),
				fs.readFileSync(path.join(os.tmpdir(), 'swint-builder-svg-out/tech.svg'))
			);
			done();
		});
	});

	after(function() {
		fs.unlinkSync(path.join(os.tmpdir(), 'swint-builder-svg-out/flags.svg'));
		fs.unlinkSync(path.join(os.tmpdir(), 'swint-builder-svg-out/tech.svg'));
		fs.rmdirSync(path.join(os.tmpdir(), 'swint-builder-svg-out'));
	});
});
