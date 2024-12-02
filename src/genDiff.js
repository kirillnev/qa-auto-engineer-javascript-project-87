import parseFile from './utils/fileParser.js';

export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  return `Comparing files:\n${JSON.stringify(data1, null, 2)}\n${JSON.stringify(data2, null, 2)}`;
}
