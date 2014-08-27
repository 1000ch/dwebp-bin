'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var logSymbols = require('log-symbols');

bin.run(['-version'], function (error) {
  if (error) {
    console.log(logSymbols.warning + ' pre-build test failed, compiling from source...');

    var builder = new BinBuild()
      .src('http://downloads.webmproject.org/releases/webp/libwebp-0.4.1.tar.gz')
      .cmd('node -p "require(\'fs\').chmodSync(\'./configure\', \'755\')"')
      .cmd('./configure && make && mkdir -p ' + bin.dest() + ' && mv ./examples/.libs/dwebp ' + bin.use());

    return builder.build(function (error) {
      if (error) {
        return console.log(logSymbols.error, error);
      }

      console.log(logSymbols.success + ' dwebp built successfully!');
    });
  }

  console.log(logSymbols.success + ' pre-build test passed successfully!');
});