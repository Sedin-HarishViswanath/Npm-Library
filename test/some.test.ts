import { some } from '../src/some';

describe('some', () => {
  it('returns true if any item matches', () => {
    expect(some((value: number) => value > 2, [1, 2, 3])).toBe(true);
  });

  it('returns false if no item matches', () => {
    expect(some((value: number) => value > 10, [1, 2, 3])).toBe(false);
  });

  it('returns false for empty, null, and undefined input', () => {
    expect(some((value: number) => value > 0, [])).toBe(false);
    expect(some((value: number) => value > 0, null)).toBe(false);
    expect(some((value: number) => value > 0, undefined)).toBe(false);
  });

  it('does not mutate original array', () => {
    const input = [1, 2, 3];
    const snapshot = [...input];

    some((value: number) => value > 1, input);

    expect(input).toEqual(snapshot);
  });
});
