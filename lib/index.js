import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const packageJson = fileURLToPath(new URL('../package.json', import.meta.url));
const pkg = JSON.parse(fs.readFileSync(packageJson));

const url = `https://raw.githubusercontent.com/1000ch/dwebp-bin/v${pkg.version}/vendor/`;

export default new BinWrapper()
  .src(`${url}osx/dwebp`, 'darwin')
  .src(`${url}linux/dwebp`, 'linux')
  .src(`${url}win/dwebp.exe`, 'win32')
  .dest(fileURLToPath(new URL('../vendor', import.meta.url)))
  .use(process.platform === 'win32' ? 'dwebp.exe' : 'dwebp');
