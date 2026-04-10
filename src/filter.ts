export function filter<T>(predicate: (item: T, index: number, array: T[]) => boolean, array: T[] | null | undefined): T[] {
  
  //Guard Clauses for null and empty array input
  if (!array || array.length === 0) {
    return [];
  }

  //Initalizing result array and index for efficient push(without using inbuilt .push()method)
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
