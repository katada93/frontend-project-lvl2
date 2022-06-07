import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getPath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => {
  const filepath = getPath(filename);
  const data = fs.readFileSync(filepath, 'utf-8');

  return data;
};

export default (path1, path2) => {
  console.log(getPath(path1), getPath(path2));
  const data1 = JSON.parse(readFile(path1));
  const data2 = JSON.parse(readFile(path2));

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
