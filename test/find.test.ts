import { find } from '../src/find';

type User = {
  id: number;
  name: string;
  role?: string;
};

describe('find', () => {
  const users: User[] = [
    { id: 1, name: 'Vishnu', role: 'admin' },
    { id: 2, name: 'Guest', role: 'user' },
  ];

  it('finds with predicate signature', () => {
    const result = find(users, (user) => user.id === 2);
    expect(result).toEqual({ id: 2, name: 'Guest', role: 'user' });
  });

  it('returns undefined when predicate does not match', () => {
    expect(find(users, (user) => user.id === 100)).toBeUndefined();
  });

  it('finds with key-value signature', () => {
    const result = find(users, 'name', 'Vishnu');
    expect(result).toEqual({ id: 1, name: 'Vishnu', role: 'admin' });
  });

  it('returns undefined when key-value does not match', () => {
    expect(find(users, 'name', 'Unknown')).toBeUndefined();
  });

  it('returns undefined for empty, null, and undefined input', () => {
    expect(find([], (user: User) => user.id === 1)).toBeUndefined();
    expect(find(null, (user: User) => user.id === 1)).toBeUndefined();
    expect(find(undefined, (user: User) => user.id === 1)).toBeUndefined();
  });

  it('does not mutate original array', () => {
    const input = [...users];
    const snapshot = [...input];

    find(input, (user) => user.id === 1);

    expect(input).toEqual(snapshot);
  });
});
