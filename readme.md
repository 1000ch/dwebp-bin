# [node-dwebp-bin](https://www.npmjs.org/package/dwebp-bin)

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

### Options

```sh
Usage: dwebp in_file [options] [-o out_file]

Decodes the WebP image file to PNG format [Default]
Use following options to convert into alternate image formats:
  -pam ......... save the raw RGBA samples as a color PAM
  -ppm ......... save the raw RGB samples as a color PPM
  -bmp ......... save as uncompressed BMP format
  -tiff ........ save as uncompressed TIFF format
  -pgm ......... save the raw YUV samples as a grayscale PGM
                 file with IMC4 layout
  -yuv ......... save the raw YUV samples in flat layout

 Other options are:
  -version  .... print version number and exit
  -nofancy ..... don't use the fancy YUV420 upscaler
  -nofilter .... disable in-loop filtering
  -nodither .... disable dithering
  -dither <d> .. dithering strength (in 0..100)
  -mt .......... use multi-threading
  -crop <x> <y> <w> <h> ... crop output with the given rectangle
  -scale <w> <h> .......... scale the output (*after* any cropping)
  -flip ........ flip the output vertically
  -alpha ....... only save the alpha plane
  -incremental . use incremental decoding (useful for tests)
  -h     ....... this help message
  -v     ....... verbose (e.g. print encoding/decoding times)
  -noasm ....... disable all assembly optimizations
```

## License

This is licensed under BSD.

WebP is licensed under [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/).