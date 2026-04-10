import { reduce } from '../src/reduce';
// Test cases for the reduce function
describe('reduce', () => {
  it('reduces from left to right', () => {
    const result = reduce((acc: number, value: number) => acc - value, 100, [10, 5]);
    expect(result).toBe(85);
  });
  // Test with different types
  it('returns initial value for empty, null, and undefined input', () => {
    expect(reduce((acc: number, value: number) => acc + value, 5, [])).toBe(5);
    expect(reduce((acc: number, value: number) => acc + value, 5, null)).toBe(5);
    expect(reduce((acc: number, value: number) => acc + value, 5, undefined)).toBe(5);
  });
  
  it('does not mutate original array', () => {
    const input = [1, 2, 3];
    const snapshot = [...input];

    reduce((acc: number, value: number) => acc + value, 0, input);

    expect(input).toEqual(snapshot);
  });
});
