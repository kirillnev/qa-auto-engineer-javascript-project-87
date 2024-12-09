import formatPlain from './plain.js';
import formatStylish from "./stylish.js";

const getFormatter = (format) => {
  switch (format) {
    case 'plain':
      return formatPlain;
    case 'stylish':
      return formatStylish;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormatter;
