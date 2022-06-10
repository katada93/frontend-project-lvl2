import _ from 'lodash';

const getIdent = (spaces) => '  '.repeat(spaces);

const getString = (value, spaces = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  // prettier-ignore
  const lines = _.keys(value).map(
    (node) => `${getIdent(spaces + 2)}  ${node}: ${getString(value[node], spaces + 2)}`,
  );
  const innerValue = lines.join('\n');

  return `{\n${innerValue}\n${getIdent(spaces + 1)}}`;
};

export const formatStylish = (diff) => {
  const iter = (newDiff, spaces = 1) => {
    const lines = newDiff.map((node) => {
      const diffType = {
        removed: () => `${getIdent(spaces)}- ${node.name}: ${getString(node.value, spaces)}`,
        unchanged: () => `${getIdent(spaces)}  ${node.name}: ${getString(node.value, spaces)}`,
        // prettier-ignore
        changed: () => `${getIdent(spaces)}- ${node.name}: ${getString(node.firstValue, spaces)}\n${getIdent(
          spaces,
        )}+ ${node.name}: ${getString(node.secondValue, spaces)}`,
        added: () => `${getIdent(spaces)}+ ${node.name}: ${getString(node.value, spaces)}`,
        nested: () => `${getIdent(spaces)}  ${node.name}: ${iter(node.children, spaces + 2)}`,
      };
      return diffType[node.type]();
    });
    const innerValue = lines.join('\n');
    return `{\n${innerValue}\n${getIdent(spaces - 1)}}`;
  };
  return iter(diff);
};
