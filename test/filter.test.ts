import { lens, view, set } from '../src/lens';

describe('lens', () => {
  it('creates a lens object', () => {
    expect(lens('a.b')).toEqual({ path: 'a.b' });
  });

  it('gets value using view (nested path)', () => {
    const source = {
      a: {
        b: {
          c: 10,
        },
      },
    };

    expect(view(lens('a.b.c'), source)).toBe(10);
  });

  it('returns undefined for missing path', () => {
    const source = { a: { b: 1 } };

    expect(view(lens('a.c'), source)).toBe(undefined);
  });

  it('returns undefined when viewing null/undefined', () => {
    expect(view(lens('a.b'), null)).toBe(undefined);
    expect(view(lens('a.b'), undefined)).toBe(undefined);
  });

  it('returns source when lens path is empty', () => {
    const source = { a: 1 };

    expect(view(lens(''), source)).toBe(source);
  });

  it('sets value at nested path (immutable)', () => {
    const source = {
      a: {
        b: {
          c: 10,
        },
      },
    };

    const updated = set(lens('a.b.c'), 20, source) as typeof source;

    expect(updated.a.b.c).toBe(20);
    
    expect(updated).not.toBe(source);
    expect(updated.a).not.toBe(source.a);
    expect(updated.a.b).not.toBe(source.a.b);
  });

  it('creates path if not present', () => {
    const source = {};

    const updated = set(lens('x.y.z'), 100, source) as any;

    expect(updated).toEqual({
      x: {
        y: {
          z: 100,
        },
      },
    });
  });

  it('handles root level set', () => {
    const source = { a: 1 };

    const updated = set(lens('a'), 5, source) as typeof source;

    expect(updated.a).toBe(5);
  });
});