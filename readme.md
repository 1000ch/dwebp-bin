# node-dwebp-bin

[![Build Status](https://travis-ci.org/1000ch/node-dwebp-bin.svg?branch=master)](https://travis-ci.org/1000ch/node-dwebp-bin)
[![NPM version](https://badge.fury.io/js/dwebp-bin.svg)](http://badge.fury.io/js/dwebp-bin)
[![Dependency Status](https://david-dm.org/1000ch/node-dwebp-bin.svg)](https://david-dm.org/1000ch/node-dwebp-bin)
[![devDependency Status](https://david-dm.org/1000ch/node-dwebp-bin/dev-status.svg)](https://david-dm.org/1000ch/node-dwebp-bin#info=devDependencies)

## Dependency

WebP requires following libraries. See [detail](https://developers.google.com/speed/webp/docs/compiling).

### Linux

```sh
$ sudo apt-get install libjpeg-dev libpng-dev libtiff-dev libgif-dev
```

### Mac OS X

```sh
$ sudo port install jpeg libpng tiff giflib
```

## Install

```sh
$ npm install --save dwebp-bin
```

## Usage

### Command Line

```sh
$ dwebp input.webp -o output.png
```

### From source file

```js
var execFile = require('child_process').execFile;
var dwebp = require('dwebp-bin').path;

execFile(dwebp, ['input.webp', '-o', 'output.png'], function (error) {
  if (error) {
    throw error;
  }

  console.log('Image was converted');
});
```

## License

This is licensed under BSD.
WebP is licensed under [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/).