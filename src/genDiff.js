import parseFile from './utils/fileParser.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const formatFunction = getFormatter(format);

  const lexicographicSort = (arr) => {
    const sortedArr = [];
    for (const item of arr) {
      let inserted = false;
      for (let i = 0; i < sortedArr.length; i++) {
        if (item < sortedArr[i]) {
          sortedArr.splice(i, 0, item);
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        sortedArr.push(item);
      }
    }
    return sortedArr;
  };

  const keys = lexicographicSort(
    Array.from(new Set(Object.keys(data1).concat(Object.keys(data2))))
  );

  const diff = keys.map((key) => {
    if (!(key in data2)) {
      return {
        key,
        value: data1[key],
        type: 'removed',
      };
    }
    if (!(key in data1)) {
      return {
        key,
        value: data2[key],
        type: 'added',
      };
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        value: data2[key],
        lastValue: data1[key],
        type: 'updated',
      };
    }
    return {
      key,
      value: data1[key],
      type: 'unchanged',
    };
  });

  return formatFunction(diff);
};

export default genDiff;
