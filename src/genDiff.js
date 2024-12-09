const genDiff = (data1, data2, formatFunction) => {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();

  const diff = keys.map((key) => {
    if (!(key in data2)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (!(key in data1)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (data1[key] !== data2[key]) {
      return { key, value: data2[key], lastValue: data1[key], type: 'updated' };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });

  return formatFunction(diff);
};

export default genDiff;
