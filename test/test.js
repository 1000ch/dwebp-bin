/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('dwebp()', function () {
  afterEach(function (callback) {
    rm(path.join(__dirname, 'tmp'), callback);
  });

  beforeEach(function () {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  });

  it('should rebuild the dwebp binaries', function (callback) {
    var tmp = path.join(__dirname, 'tmp');
    var builder = new BinBuild()
      .src('http://downloads.webmproject.org/releases/webp/libwebp-0.4.1.tar.gz')
      .cmd('node -p "require(\'fs\').chmodSync(\'./configure\', \'755\')"')
      .cmd('./configure && make && mv ./examples/.libs/dwebp ' + path.join(tmp, 'dwebp'));

    builder.build(function (error) {
      if (error) {
        callback(error);
        return;
      }

      assert(fs.existsSync(path.join(tmp, 'dwebp')));
      callback();
    });
  });

  it('should return path to binary and verify that it is working', function (callback) {
    var binPath = require('../').path;
    var args = [
      path.join(__dirname, 'fixtures/test.webp'),
      '-o',
      path.join(__dirname, 'tmp/test.png')
    ];

    binCheck(binPath, args, function (error, works) {
      callback(assert.equal(works, true));
    });
  });

  it('should convert WebP into PNG', function (callback) {
    var binPath = require('../').path;
    var args = [
      path.join(__dirname, 'fixtures/test.webp'),
      '-o',
      path.join(__dirname, 'tmp/test.png')
    ];

    execFile(binPath, args, function () {
      callback(assert(fs.statSync(path.join(__dirname, 'tmp/test.png'))));
    });
  });
});
