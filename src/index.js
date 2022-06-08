import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
import readFile from './utils.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
};

const parse = (data, fileformat) => {
  const func = parsers[fileformat];

  return func(data);
};

const getParesedData = (file) => {
  const data = readFile(file);
  const fileformat = path.extname(file).substring(1);

  return parse(data, fileformat);
};

export default (file1, file2) => {
  const data1 = getParesedData(file1);
  const data2 = getParesedData(file2);

  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);
  let result = '{\n';
  const space = '  ';

  sortedKeys.forEach((key) => {
    if (!_.has(data1, key)) {
      result += `${space}+ ${key}: ${data2[key]}\n`;
    } else if (!_.has(data2, key)) {
      result += `${space}- ${key}: ${data1[key]}\n`;
    } else if (data1[key] !== data2[key]) {
      result += `${space}- ${key}: ${data1[key]}\n`;
      result += `${space}+ ${key}: ${data2[key]}\n`;
    } else {
      result += `${space}${space}${key}: ${data2[key]}\n`;
    }
  });

  return `${result.trim()}\n}`;
};
