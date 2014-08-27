'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');

var bin = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/osx/dwebp', 'darwin')
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/linux/dwebp', 'linux')
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/win/dwebp.exe', 'win32')
  .dest(path.join(__dirname, 'vendor'))
  .use(process.platform === 'win32' ? 'dwebp.exe' : 'dwebp');

module.exports = bin;