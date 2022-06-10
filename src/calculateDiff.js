import _ from 'lodash';

const calculateDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  const result = keys.map((node) => {
    if (!_.has(data1, node)) {
      return { name: node, type: 'added', value: data2[node] };
    }
    if (!_.has(data2, node)) {
      return { name: node, type: 'removed', value: data1[node] };
    }
    if (_.isObject(data1[node]) && _.isObject(data2[node])) {
      return { name: node, type: 'nested', children: calculateDiff(data1[node], data2[node]) };
    }
    if (typeof data1[node] !== typeof data2[node] || data1[node] !== data2[node]) {
      return {
        name: node,
        type: 'changed',
        firstValue: data1[node],
        secondValue: data2[node],
      };
    }
    return { name: node, type: 'unchanged', value: data1[node] };
  });

  console.log(result);
  return _.sortBy(result, 'name');
};

export default calculateDiff;
