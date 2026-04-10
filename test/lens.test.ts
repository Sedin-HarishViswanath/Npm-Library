import { lens, view, set } from '../src/lens';

describe('lens', () => {
  it('creates a lens object with path', () => {
    expect(lens('profile.settings.theme')).toEqual({ path: 'profile.settings.theme' });
  });

  it('views a nested value', () => {
    const user = {
      profile: {
        settings: {
          theme: 'light',
        },
      },
    };

    const themeLens = lens('profile.settings.theme');
    expect(view(themeLens, user)).toBe('light');
  });

  it('returns source when lens path is empty', () => {
    const source = { a: 1 };
    expect(view(lens(''), source)).toBe(source);
  });

  it('returns undefined when viewing null/undefined or missing path', () => {
    const themeLens = lens('profile.settings.theme');

    expect(view(themeLens, null)).toBeUndefined();
    expect(view(themeLens, undefined)).toBeUndefined();
    expect(view(themeLens, { profile: {} })).toBeUndefined();
  });

  it('sets a nested value without mutating original object', () => {
    const user = {
      id: 1,
      profile: {
        settings: {
          theme: 'light',
          notifications: true,
        },
      },
    };

    const themeLens = lens('profile.settings.theme');
    const updated = set(themeLens, 'dark', user);

    expect(user.profile.settings.theme).toBe('light');
    expect(updated.profile.settings.theme).toBe('dark');
    expect(updated).not.toBe(user);
    expect(updated.profile).not.toBe(user.profile);
    expect(updated.profile.settings).not.toBe(user.profile.settings);
  });

  it('creates missing nested path during set', () => {
    const result = set(lens('a.b.c'), 42, {});
    expect(result).toEqual({ a: { b: { c: 42 } } });
  });

  it('supports setting with undefined source object', () => {
    const result = set(lens('profile.name'), 'Vishnu', undefined as any);
    expect(result).toEqual({ profile: { name: 'Vishnu' } });
  });

  it('replaces root value when path is empty', () => {
    const source = { a: 1 };
    const updated = set(lens(''), { b: 2 }, source as any);

    expect(updated).toEqual({ b: 2 });
    expect(source).toEqual({ a: 1 });
  });
});
