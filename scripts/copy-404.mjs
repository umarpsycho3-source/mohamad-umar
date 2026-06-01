import { copyFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

try {
  await access(indexPath, constants.F_OK);
  await copyFile(indexPath, notFoundPath);
  console.log('Created dist/404.html from dist/index.html');
} catch (error) {
  console.error('Failed to create 404.html:', error.message);
  process.exitCode = 1;
}
