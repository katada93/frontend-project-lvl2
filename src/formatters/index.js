import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const formats = { stylish, plain, json };

export default (diff, type) => formats[type](diff);
