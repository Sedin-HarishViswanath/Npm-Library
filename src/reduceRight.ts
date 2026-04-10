// Custom reduceRight implementation 
// Applies a reducer function starting from the end of the array
export function reduceRight<T, U>(
  // Reducer function: combines accumulator with current item
  reducer: (accumulator: U, item: T, index: number, array: readonly T[]) => U,

  // Initial value for the accumulator
  initialValue: U,

  // Input array (readonly to ensure immutability)
  array: readonly T[] | null | undefined
): U {

  // Guard clause:
  // If array is null, undefined, or empty → return initial value
  if (!array || array.length === 0) {
    return initialValue;
  }

  // Initialize accumulator
  let accumulator = initialValue;

  // Iterate from right to left
  for (let index = array.length - 1; index >= 0; index -= 1) {
    accumulator = reducer(accumulator, array[index], index, array);
  }

  // Return final accumulated result
  return accumulator;
}