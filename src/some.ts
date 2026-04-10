// Custom implementation of "some"
// Returns true if at least one element satisfies the predicate
export function some<T>(
  // Predicate function to test each element
  predicate: (item: T, index: number, array: readonly T[]) => boolean,

  // Input array (readonly ensures no mutation)
  array: readonly T[] | null | undefined
): boolean {

  // Guard clause:
  // If array is null, undefined, or empty → no element satisfies condition
  if (!array || array.length === 0) {
    return false;
  }

  // Iterate through array and check condition
  for (let index = 0; index < array.length; index += 1) {

    // Return true immediately when condition is met (short-circuit)
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  // If no elements satisfy the condition, return false
  return false;
}