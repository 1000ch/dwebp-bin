import process from 'node:process';
import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import log from 'logalot';
import bin from './index.js';

bin.run(['-version']).then(() => {
  log.success('pre-build test passed successfully!');
}).catch(async error => {
  log.warn(error.message);
  log.warn('dwebp pre-build test failed');
  log.info('compiling from source');

  try {
    const src = fileURLToPath(new URL('../vendor/source/libwebp-1.1.0.tar.gz', import.meta.url));
    await binBuild.file(src, [
      `./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
      'make && make install',
    ]);

    log.success('dwebp built successfully');
  } catch (error) {
    log.error(error.stack);

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
});
