import { filter } from '../src/filter';

describe('filter', () => {
  it('keeps matching values', () => {
    expect(filter((value: number) => value > 1, [1, 2, 3])).toEqual([2, 3]);
  });

  it('returns empty array when nothing matches', () => {
    expect(filter((value: number) => value > 10, [1, 2, 3])).toEqual([]);
  });

  it('returns empty array for empty, null, and undefined input', () => {
    expect(filter((value: number) => value > 1, [])).toEqual([]);
    expect(filter((value: number) => value > 1, null)).toEqual([]);
    expect(filter((value: number) => value > 1, undefined)).toEqual([]);
  });

  it('does not mutate original array', () => {
    const input = [1, 2, 3];
    const snapshot = [...input];

    filter((value: number) => value > 1, input);

    expect(input).toEqual(snapshot);
  });
});
