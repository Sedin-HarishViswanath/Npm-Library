type Predicate<T> = (item: T, index: number, array: T[]) => boolean;

export function find<T>(array: T[] | null | undefined, predicate: Predicate<T>): T | undefined;
export function find<T, K extends keyof T>(array: T[] | null | undefined, key: K, value: T[K]): T | undefined;
export function find<T, K extends keyof T>(
  array: T[] | null | undefined,
  predicateOrKey: Predicate<T> | K,
  value?: T[K],
): T | undefined {
  if (!array || array.length === 0) {
    return undefined;
  }

  if (typeof predicateOrKey === 'function') {
    for (let index = 0; index < array.length; index += 1) {
      if (predicateOrKey(array[index], index, array)) {
        return array[index];
      }
    }

    return undefined;
  }

  for (let index = 0; index < array.length; index += 1) {
    const item = array[index];

    if (item && item[predicateOrKey] === value) {
      return item;
    }
  }

  return undefined;
}
