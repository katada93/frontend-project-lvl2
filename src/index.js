import path from 'path';
import yaml from 'js-yaml';
import readFile from './utils.js';
import calculateDiff from './calculateDiff.js';
import format from './formatters/index.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
};

const parseData = (data, fileformat) => {
  const parse = parsers[fileformat];

  return parse(data);
};

const getParesedData = (file) => {
  const data = readFile(file);
  const fileformat = path.extname(file).substring(1);

  return parseData(data, fileformat);
};

export default (file1, file2, type = 'stylish') => {
  const data1 = getParesedData(file1);
  const data2 = getParesedData(file2);
  const diff = calculateDiff(data1, data2);

  return format(diff, type);
};
