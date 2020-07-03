# [dwebp-bin](https://www.npmjs.org/package/dwebp-bin) [![Build Status](https://travis-ci.org/1000ch/dwebp-bin.svg?branch=master)](https://travis-ci.org/1000ch/dwebp-bin)

## Install

```sh
$ npm install --save dwebp-bin
```

WebP requires following libraries on Linux. See [detail](https://developers.google.com/speed/webp/docs/compiling#compiling_on_unix-like_platforms).

```sh
$ sudo apt-get install libjpeg-dev libpng-dev libtiff-dev libgif-dev
```

## Usage

```js
const {execFile} = require('child_process');
const dwebp = require('dwebp-bin');

execFile(dwebp, ['input.webp', '-o', 'output.png'], error => {
  if (error) {
    throw error;
  }

  console.log('Image is converted!');
});
```

## CLI

```sh
$ dwebp input.webp -o output.png
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
