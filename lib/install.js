import process from 'node:process';
import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import bin from './index.js';

bin.run(['-version']).then(() => {
  console.log('pre-build test passed successfully!');
}).catch(async error => {
  console.warn(error.message);
  console.warn('dwebp pre-build test failed');
  console.info('compiling from source');

  try {
    const src = fileURLToPath(new URL('../vendor/source/libwebp-1.1.0.tar.gz', import.meta.url));
    await binBuild.file(src, [
      `./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
      'make && make install',
    ]);

    console.log('dwebp built successfully');
  } catch (error) {
    console.error(error.stack);

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
});
