'use strict';
const BinWrapper = require('bin-wrapper');
const path = require('path');

module.exports = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/osx/dwebp', 'darwin')
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/linux/dwebp', 'linux')
  .src('https://raw.github.com/1000ch/node-dwebp-bin/master/vendor/win/dwebp.exe', 'win32')
  .dest(path.join(__dirname, '../vendor'))
  .use(process.platform === 'win32' ? 'dwebp.exe' : 'dwebp');
