'use strict';

var bin = require('./');
var binBuild = require('bin-build');
var logSymbols = require('log-symbols');

bin.run(['-version'], function (error) {
  if (error) {
    console.log(logSymbols.warning + ' pre-build test failed, compiling from source...');

    return binBuild.url('http://downloads.webmproject.org/releases/webp/libwebp-0.4.1.tar.gz', [
      'node -p "require(\'fs\').chmodSync(\'./configure\', \'755\')"',
      './configure && make && mkdir -p ' + bin.dest() + ' && mv ./examples/.libs/dwebp ' + bin.use()
    ]).then(function () {
      console.log(logSymbols.success + ' dwebp built successfully!');
    }).catch(function (error) {
      console.log(logSymbols.error, error);
    });
  }

  console.log(logSymbols.success + ' pre-build test passed successfully!');
});
