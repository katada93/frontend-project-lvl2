import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getNodeName = (node, ancestor) => {
  if (ancestor === '') {
    return `${node.name}`;
  }
  return `${ancestor}.${node.name}`;
};

export const formatPlain = (diff) => {
  const iter = (newDiff, ancestor = '') => {
    const lines = newDiff
      .map((node) => {
        const diffType = {
          unchanged: () => '',
          removed: () => `Property '${getNodeName(node, ancestor)}' was removed`,
          // prettier-ignore
          changed: () => `Property '${getNodeName(node, ancestor)}' was updated. From ${getValue(
            node.firstValue,
          )} to ${getValue(node.secondValue)}`,
          // prettier-ignore
          added: () => `Property '${getNodeName(node, ancestor)}' was added with value: ${getValue(
            node.value,
          )}`,
          nested: () => iter(node.children, getNodeName(node, ancestor)),
        };
        return diffType[node.type]();
      })
      .filter((node) => node !== '');
    const innerValue = lines.join('\n');
    return innerValue;
  };
  return iter(diff);
};
