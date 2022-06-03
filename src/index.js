import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const readFile = (fileName) => {
  const filePath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(filePath, 'utf-8');

  return data;
};

export default (path1, path2) => {
  const data1 = JSON.parse(readFile(path1));
  const data2 = JSON.parse(readFile(path2));

  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);
  let result = '';

  sortedKeys.forEach((key) => {
    if (!_.has(data1, key)) {
      result += `+ ${key}: ${data2[key]}${'\n'}`;
    } else if (!_.has(data2, key)) {
      result += `- ${key}: ${data1[key]}${'\n'}`;
    } else if (data1[key] !== data2[key]) {
      result += `- ${key}: ${data1[key]}${'\n'}`;
      result += `+ ${key}: ${data2[key]}${'\n'}`;
    } else {
      result += `  ${key}: ${data2[key]}${'\n'}`;
    }
  });

  return result.trim();
};
