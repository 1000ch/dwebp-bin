import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import execa from 'execa';
import tempy from 'tempy';
import binCheck from 'bin-check';
import binBuild from 'bin-build';
import isPNG from 'is-png';
import dwebp from '../index.js';

test('rebuild the dwebp binaries', async t => {
  const temporary = tempy.directory();
  const src = fileURLToPath(new URL('../vendor/source/libwebp-1.1.0.tar.gz', import.meta.url));

  await binBuild.file(src, [
    `./configure --disable-shared --prefix="${temporary}" --bindir="${temporary}"`,
    'make && make install',
  ]);

  t.true(await fs.exists(path.join(temporary, 'dwebp')));
});

test('return path to binary and verify that it is working', async t => {
  t.true(await binCheck(dwebp, ['-version']));
});

test('convert a WebP to PNG', async t => {
  const temporary = tempy.directory();
  const src = fileURLToPath(new URL('fixtures/test.webp', import.meta.url));
  const dest = path.join(temporary, 'test.png');
  const args = [
    src,
    '-o',
    dest,
  ];

  await execa(dwebp, args);

  t.true(isPNG(await fs.readFile(dest)));
});
