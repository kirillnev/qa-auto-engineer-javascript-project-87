const formatPlain = (diff) => {
  return diff
    .map((node) => {
      switch (node.type) {
        case 'removed':
          return `Property '${node.key}' was removed`;
        case 'added':
          return `Property '${node.key}' was added with value: ${node.value}`;
        case 'updated':
          return `Property '${node.key}' was updated. From ${node.value} to ${node.lastValue}`;
        default:
          return null;
      }
    })
    .filter(Boolean)
    .join('\n');
};

export default formatPlain;
