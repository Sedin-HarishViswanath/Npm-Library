// Custom reduce implementation
// Applies a reducer function to each element and accumulates a single result
export function reduce<T, U>(
  // Reducer function: takes accumulator and current item, returns updated accumulator
  reducer: (accumulator: U, item: T, index: number, array: readonly T[]) => U,

  // Initial value for the accumulator
  initialValue: U,

  // Input array (readonly ensures immutability)
  array: readonly T[] | null | undefined
): U {

  // Guard clause:
  // If array is null, undefined, or empty → return initial value directly
  if (!array || array.length === 0) {
    return initialValue;
  }

  // Initialize accumulator with the provided initial value
  let accumulator = initialValue;

  // Iterate through array and apply reducer sequentially
  for (let index = 0; index < array.length; index += 1) {
    accumulator = reducer(accumulator, array[index], index, array);
  }

  // Return the final accumulated result
  return accumulator;
}