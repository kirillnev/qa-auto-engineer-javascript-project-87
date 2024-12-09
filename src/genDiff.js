const genDiff = (data1, data2, formatFunction) => {
  if (typeof data1 !== 'object' || data1 === null) {
    throw new TypeError('data1 must be a non-null object');
  }

  if (typeof data2 !== 'object' || data2 === null) {
    throw new TypeError('data2 must be a non-null object');
  }

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
