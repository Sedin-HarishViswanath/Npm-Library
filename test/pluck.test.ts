// test file for pluck function
import { pluck } from '../src/pluck';

type Item = {
  id: number;
  info?: {
    email?: string;
  };
  tags: string[];
};
// Test cases for the pluck function
describe('pluck', () => {
  const data: Item[] = [
    { id: 1, info: { email: 'livi@test.com' }, tags: ['dev'] },
    { id: 2, info: { email: 'hari@test.com' }, tags: ['hr'] },
  ];
  
  it('plucks a simple key', () => {
    expect(pluck('id', data)).toEqual([1, 2]);
  });

  it('plucks a deep path', () => {
    expect(pluck('info.email', data)).toEqual(['livi@test.com', 'hari@test.com']);
  });

  it('returns undefined for missing deep values', () => {
    const withMissing: Item[] = [
      { id: 1, tags: ['dev'] },
    ];

    expect(pluck('info.email', withMissing)).toEqual([undefined]);
  });

  it('returns undefined for null items in deep path mode', () => {
    const withNullItem = [null] as unknown as Item[];
    expect(pluck('info.email', withNullItem)).toEqual([undefined]);
  });

  it('plucks multiple keys into new objects', () => {
    expect(pluck(['id', 'tags'], data)).toEqual([
      { id: 1, tags: ['dev'] },
      { id: 2, tags: ['hr'] },
    ]);
  });

  it('returns empty array for empty, null, and undefined input', () => {
    expect(pluck('id', [])).toEqual([]);
    expect(pluck('id', null)).toEqual([]);
    expect(pluck('id', undefined)).toEqual([]);
  });

  it('does not mutate original array or items', () => {
    const input: Item[] = [
      { id: 1, info: { email: 'livi@test.com' }, tags: ['x'] },
    ];

    const snapshot = JSON.parse(JSON.stringify(input));

    pluck(['id', 'tags'], input);
    pluck('info.email', input);

    expect(input).toEqual(snapshot);
  });
});
