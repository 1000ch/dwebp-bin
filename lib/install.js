'use strict';
const bin = require('.');
const binBuild = require('bin-build');
const log = require('logalot');

bin.run(['-version']).then(() => {
  log.success('pre-build test passed successfully!');
}).catch(async error => {
  log.warn(error.message);
  log.warn('dwebp pre-build test failed');
  log.info('compiling from source');

  try {
    await binBuild.url('http://downloads.webmproject.org/releases/webp/libwebp-0.4.1.tar.gz', [
      'node -p "require(\'fs\').chmodSync(\'./configure\', \'755\')"',
      './configure && make && mkdir -p ' + bin.dest() + ' && mv ./examples/.libs/dwebp ' + bin.use()
    ]);

    log.success('dwebp built successfully');
  } catch (error) {
    log.error(error.stack);

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
});
