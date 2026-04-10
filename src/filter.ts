export function filter<T>(predicate: (item: T, index: number, array: T[]) => boolean, array: T[] | null | undefined): T[] {
  if (!array || array.length === 0) {
    return [];
  }

  const result: T[] = [];
  let resultIndex = 0;

  for (let index = 0; index < array.length; index += 1) {
    const item = array[index];

    if (predicate(item, index, array)) {
      result[resultIndex] = item;
      resultIndex += 1;
    }
  }

  return result;
}
