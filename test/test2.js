var os = require('os'),
	fs = require('fs'),
	path = require('path'),
	assert = require('assert'),
	swintHelper = require('swint-helper'),
	buildSVG = require('../lib');

// global.swintVar.printLevel = 5;

describe('builder-svg2', function() {
	it('Simple case', function(done) {
		buildSVG({
			name: 'Test',
			inDir: path.join(__dirname, '../test_case'),
			outDir: path.join(__dirname, '../swint-builder-svg-out')
		}, function(err, res) {
			print(err);
			print(res);
			done();
		});
	});
});
