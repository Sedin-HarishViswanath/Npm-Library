import { reduceRight } from '../src/reduceRight';

// Test cases for the reduceRight function
describe('reduceRight', () => {
  it('reduces from right to left', () => {
    const result = reduceRight((acc: string, value: string) => `${acc}${value}`, '', ['a', 'b', 'c']);
    expect(result).toBe('cba');
  });
  // Test with different types
  it('returns initial value for empty, null, and undefined input', () => {
    expect(reduceRight((acc: number, value: number) => acc + value, 5, [])).toBe(5);
    expect(reduceRight((acc: number, value: number) => acc + value, 5, null)).toBe(5);
    expect(reduceRight((acc: number, value: number) => acc + value, 5, undefined)).toBe(5);
  });

  it('does not mutate original array', () => {
    const input = [1, 2, 3];
    const snapshot = [...input];

    reduceRight((acc: number, value: number) => acc + value, 0, input);

    expect(input).toEqual(snapshot);
  });
});
