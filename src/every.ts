export function every<T>(predicate: (item: T, index: number, array: T[]) => boolean, array: T[] | null | undefined): boolean {
  if (!array) {
    return false;
  } // guard clauses for null/undefined input

  if (array.length === 0) {
    return true;
  }//edge case for empty array

  for (let index = 0; index < array.length; index += 1) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }

  return true;
}
