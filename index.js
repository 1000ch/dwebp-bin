'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/**
 * Initialize a new BinWrapper
 */
var bin = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/osx/dwebp', 'darwin')
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/linux/dwebp', 'linux')
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/win/dwebp.exe', 'win64')
  .dest(path.join(__dirname, 'vendor'))
  .use('dwebp');

/**
 * Only run check if binary doesn't already exist
 */
fs.exists(bin.use(), function (exists) {
  if (!exists) {
    bin.run('-version', function (error) {
      if (error) {
        console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

        var builder = new BinBuild()
          .src('https://webp.googlecode.com/files/libwebp-0.4.0.tar.gz')
          .make('./configure && make && mkdir -p ' + bin.dest() + ' && mv ./examples/.libs/dwebp ' + bin.use());

        return builder.build(function (error) {
          if (error) {
            return console.log(chalk.red('✗ ' + err));
          }

          console.log(chalk.green('✓ dwebp built successfully'));
        });
      }

      console.log(chalk.green('✓ pre-build test passed successfully'));
    });
  }
});

/**
 * Module exports
 */
module.exports.path = bin.use();