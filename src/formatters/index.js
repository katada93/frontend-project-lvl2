import formatJSON from './json.js';
import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJSON,
};

export default (diff, type) => formats[type](diff);
