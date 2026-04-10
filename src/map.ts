// Implementation of the map function

export function map<T, U>(
  // Function used to transform each element of the array
  transform: (item: T, index: number, array: readonly T[]) => U,

  // Input array (readonly ensures we don't accidentally mutate it)
  array: readonly T[] | null | undefined
): U[] {

  // Guard clause:
  // If the input is null, undefined, or empty, return an empty array
  if (!array || array.length === 0) return [];

  // Create a new array to store transformed results
  const result: U[] = [];

  // Iterate through each element manually
  for (let i = 0; i < array.length; i++) {

    // Apply the transform function and store result at the same index
    // This preserves order and avoids using push
    result[i] = transform(array[i], i, array);
  }

  // Return the newly created array (original input remains unchanged)
  return result;
}