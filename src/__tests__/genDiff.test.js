import genDiff from '../genDiff.js';
import {describe, expect, test} from "@jest/globals";
import formatStylish from '../formatters/stylish.js';

describe('genDiff function', () => {
  test('returns an empty object when both objects are empty', () => {
    const data1 = {};
    const data2 = {};
    const expected = '{\n}';
    expect(genDiff(data1, data2, formatStylish)).toBe(expected);
  });

  test('returns an unchanged key without "-" or "+"', () => {
    const data1 = {
      key: 'value',
    };
    const data2 = {
      key: 'value',
    };
    const expected = '{\n    key: value\n}';
    expect(genDiff(data1, data2, formatStylish)).toBe(expected);
  });

  test('returns a string with "-" and "+" for a modified key', () => {
    const data1 = {
      key: 'value1',
    };
    const data2 = {
      key: 'value2',
    };
    const expected = '{\n  - key: value1\n  + key: value2\n}';

    expect(genDiff(data1, data2, formatStylish)).toBe(expected);
  });

  test('returns a string with "-" for a removed key', () => {
    const data1 = {
      key: 'value',
    };
    const data2 = {};
    const expected = '{\n  - key: value\n}';

    expect(genDiff(data1, data2, formatStylish)).toBe(expected);
  });

  test('returns a string with "+" for an added key', () => {
    const data1 = {};
    const data2 = {
      key: 'value',
    };
    const expected = '{\n  + key: value\n}';

    expect(genDiff(data1, data2, formatStylish)).toBe(expected);
  });

  test('correctly processes all changes (added, removed, and modified keys)', () => {
    const data1 = {
      a_key: 1,
      b_key: 'value_b',
      c_key: 'value_с',
    };
    const data2 = {
      a_key: 1,
      c_key: 'value_not_с',
      d_key: 'value_d',
    };
    const expected = '{\n    a_key: 1\n  - b_key: value_b\n  - c_key: value_с\n  + c_key: value_not_с\n  + d_key: value_d\n}';

    expect(genDiff(data1, data2, formatStylish)).toBe(expected);
  });

  test('returns keys in alphabetical order regardless of input order', () => {
    const data1 = {
      b_key: 'value_b',
      a_key: 1,
      c_key: 'value_с',
    };
    const data2 = {
      a_key: 1,
      d_key: 'value_d',
      c_key: 'value_not_с',
    };
    const expected = `{\n    a_key: 1\n  - b_key: value_b\n  - c_key: value_с\n  + c_key: value_not_с\n  + d_key: value_d\n}`;

    expect(genDiff(data1, data2, formatStylish)).toBe(expected);
  });

  test('correctly handles values like undefined, null, empty strings, or booleans', () => {
    const data1 = {
      a_key: true,
      b_key: false,
      c_key: '',
      d_key: null,
      e_key: undefined,
    };
    const data2 = {};
    const expected = `{\n  - a_key: true\n  - b_key: false\n  - c_key: \n  - d_key: null\n  - e_key: undefined\n}`;

    expect(genDiff(data1, data2, formatStylish)).toBe(expected);
  });
});



