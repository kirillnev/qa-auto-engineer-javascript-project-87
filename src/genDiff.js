import parseFile from './utils/fileParser.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();

  const result = keys.map((key) => {
    if (!(key in data2)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!(key in data1)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;