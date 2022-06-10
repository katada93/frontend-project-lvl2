import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { it, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

it('should work correct with json formatter', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expected = readFile('expected-json.txt');
  const result = genDiff(path1, path2, 'json');

  expect(expected).toEqual(result);
});

it('should work correct with plain formatter', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const expected = readFile('expected-plain.txt');
  const result = genDiff(path1, path2, 'plain');

  expect(expected).toEqual(result);
});

it('should work correct with stylish formatter', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.yml');
  const expected = readFile('expected-stylish.txt');
  const result = genDiff(path1, path2);

  expect(expected).toEqual(result);
});
