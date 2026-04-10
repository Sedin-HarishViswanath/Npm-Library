// Helper: Safely get a nested value from an object using dot notation
function getByPath(value: unknown, path: string): unknown {
  // guard clause
  // Return undefined if base value is null/undefined
  if (value === null || value === undefined) {
    return undefined;
  }

  const parts = path.split('.');
  let current: unknown = value;

  // Traverse object step-by-step using path parts
  for (let index = 0; index < parts.length; index += 1) {
    if (current === null || current === undefined) {
      return undefined;
    }

    const part = parts[index];

    // Cast to generic object to access dynamic keys safely
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

// Helper: Extract only specified keys from an object
function pickKeys<T extends Record<string, unknown>>(
  item: T,
  keys: Array<keyof T>
): Partial<T> {
  const result: Partial<T> = {};

  // Copy only requested keys into a new object (immutability safe)
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    result[key] = item[key];
  }

  return result;
}

// Main pluck function
export function pluck<T extends Record<string, unknown>, K extends keyof T>(
  keyOrPathOrKeys: K | string | K[],
  array: T[] | null | undefined
): Array<unknown> {

  // Guard clause for null/undefined/empty input
  if (!array || array.length === 0) {
    return [];
  }

  const result: Array<unknown> = [];

  // Case 1: Multiple keys
  if (Array.isArray(keyOrPathOrKeys)) {
    for (let index = 0; index < array.length; index += 1) {
      result[index] = pickKeys(array[index], keyOrPathOrKeys);
    }
    return result;
  }

  // Case 2: Deep path (dot notation)
  if (typeof keyOrPathOrKeys === 'string' && keyOrPathOrKeys.includes('.')) {
    for (let index = 0; index < array.length; index += 1) {
      result[index] = getByPath(array[index], keyOrPathOrKeys);
    }
    return result;
  }

  // Case 3: Single key
  for (let index = 0; index < array.length; index += 1) {
    const item = array[index];

    // Direct property access
    result[index] = item[keyOrPathOrKeys as K];
  }

  return result;
}