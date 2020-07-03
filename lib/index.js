'use strict';
const BinWrapper = require('bin-wrapper');
const path = require('path');
const pkg = require('../package.json');

const url = `https://raw.githubusercontent.com/1000ch/dwebp-bin/v${pkg.version}/vendor/`;

module.exports = new BinWrapper()
  .src(`${url}osx/dwebp`, 'darwin')
  .src(`${url}linux/dwebp`, 'linux')
  .src(`${url}win/dwebp.exe`, 'win32')
  .dest(path.join(__dirname, '../vendor'))
  .use(process.platform === 'win32' ? 'dwebp.exe' : 'dwebp');
