import parseData from '../dataParser.js';
import { expect, test } from '@jest/globals';

test('correctly parses valid JSON content', () => {
  const content = '{"key": "value"}';
  const expected = {key: "value"};

  expect(parseData(content, '.json')).toEqual(expected);
});

test('throws error for unsupported file format', () => {
  const content = 'some text';
  const format = '.txt';

  expect(() => parseData(content, format)).toThrow(`Unsupported file format: ${format}`);
});

test('throws an error for invalid JSON content', () => {
  const invalidJsonContent = '{key: value}';
  const format = '.json';

  expect(() => parseData(invalidJsonContent, format)).toThrow();
});

