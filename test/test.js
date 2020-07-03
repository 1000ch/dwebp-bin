'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const isPNG = require('is-png');
const dwebp = require('..');

test('rebuild the dwebp binaries', async t => {
  const temporary = tempy.directory();

  await binBuild.file(path.resolve(__dirname, '../vendor/source/libwebp-1.1.0.tar.gz'), [
    `./configure --disable-shared --prefix="${temporary}" --bindir="${temporary}"`,
    'make && make install'
  ]);

  t.true(fs.existsSync(path.join(temporary, 'dwebp')));
});

test('return path to binary and verify that it is working', async t => {
  t.true(await binCheck(dwebp, ['-version']));
});

test('convert a WebP to PNG', async t => {
  const temporary = tempy.directory();
  const src = path.join(__dirname, 'fixtures/test.webp');
  const dest = path.join(temporary, 'test.png');
  const args = [
    src,
    '-o',
    dest
  ];

  await execa(dwebp, args);

  t.true(isPNG(fs.readFileSync(dest)));
});
