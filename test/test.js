/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert').strict;
var binCheck = require('bin-check');
var binBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf').sync;
var promisify = require('util').promisify;
var execFileAsync = promisify(execFile);

describe('dwebp()', function () {
  var tmp = path.join(__dirname, 'tmp');
  var testPng = path.join(tmp, 'test.png');
  var testWebP = path.join(__dirname, 'fixtures/test.webp');
  var dwebpBin = path.join(tmp, 'dwebp');
  var binPath = require('../').path;
  var args = [
    testWebP,
    '-o',
    testPng
  ];

  afterEach(function (callback) {
    rm(tmp);
    callback();
  });

  beforeEach(function (callback) {
    fs.mkdirSync(tmp);
    callback();
  });

  it('should rebuild the dwebp binaries', function () {
    return binBuild.url('https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.1.0.tar.gz', [
      'node -p "require(\'fs\').chmodSync(\'./configure\', \'755\')"',
      './configure && make && mv ./examples/.libs/dwebp ' + dwebpBin
    ]).then(function () {
      assert.strictEqual(fs.existsSync(dwebpBin), true);
    }).catch(function (error) {
      assert.fail(error);
    });
  });

  it('should return path to binary and verify that it is working', function () {
    return binCheck(binPath, args).then(function (works) {
      assert.strictEqual(works, true);
    }).catch(function (error) {
      assert.fail(error);
    });
  });

  it('should convert WebP into PNG', function () {
    return execFileAsync(binPath, args).then(function () {
      assert.strictEqual(typeof fs.statSync(testPng), "object");
    }).catch(function (error) {
      assert.fail(error);
    });
  });
});
