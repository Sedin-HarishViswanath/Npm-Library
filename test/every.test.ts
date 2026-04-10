import { every } from '../src/every';

describe('every', () => {
  it('returns true when all values match', () => {
    expect(every((value: number) => value > 0, [1, 2, 3])).toBe(true);
  });

  it('returns false when at least one value fails', () => {
    expect(every((value: number) => value > 1, [1, 2, 3])).toBe(false);
  });

  it('returns true for empty input and false for null/undefined input', () => {
    expect(every((value: number) => value > 0, [])).toBe(true);
    expect(every((value: number) => value > 0, null)).toBe(false);
    expect(every((value: number) => value > 0, undefined)).toBe(false);
  });

  it('does not mutate original array', () => {
    const input = [1, 2, 3];
    const snapshot = [...input];

    every((value: number) => value > 0, input);

    expect(input).toEqual(snapshot);
  });
});
