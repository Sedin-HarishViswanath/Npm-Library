// test file for map function

import { map } from '../src/map';

// Test cases for the map function
describe('map', () => {
  it('transforms each item', () => {
    expect(map((value: number) => value * 2, [1, 2, 3])).toEqual([2, 4, 6]);
  });

  // Test that the transform function receives the correct parameters
  it('returns empty array for empty input', () => {
    expect(map((value: number) => value * 2, [])).toEqual([]);
  });

  // Test that the transform function receives the correct parameters
  it('returns empty array for null and undefined input', () => {
    expect(map((value: number) => value * 2, null)).toEqual([]);
    expect(map((value: number) => value * 2, undefined)).toEqual([]);
  });
// Test that the transform function receives the correct parameters
  it('does not mutate original array', () => {
    const input = [1, 2, 3];
    const snapshot = [...input];

    map((value: number) => value + 1, input);

    expect(input).toEqual(snapshot);
  });
});
