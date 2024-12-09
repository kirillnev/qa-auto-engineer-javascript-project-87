import formatPlain from '../plain.js';
import { describe, expect, test } from '@jest/globals';

describe('formatPlain', () => {
  test('formats diff with added, removed, and updated nodes', () => {
    const diff = [
      { type: 'removed', key: 'host', value: 'hexlet.io' },
      { type: 'added', key: 'timeout', value: 20 },
      { type: 'updated', key: 'verbose', lastValue: true, value: false },
    ];

    const expected = `Property 'host' was removed
Property 'timeout' was added with value: 20
Property 'verbose' was updated. From false to true`;

    expect(formatPlain(diff)).toBe(expected);
  });
});
