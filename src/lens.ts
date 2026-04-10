export type Lens = {
  path: string;
};

export function lens(path: string): Lens {
  return { path };
}

export function view<T>(selectedLens: Lens, obj: T | null | undefined): unknown {
  if (!obj) return undefined;
  
  if (!selectedLens.path) {
    return obj;
  }

  const keys = selectedLens.path.split('.');
  let result: unknown = obj;

  for (let i = 0; i < keys.length; i++) {
    if (result === null || result === undefined) return undefined;
    result = (result as Record<string, unknown>)[keys[i]];
  }

  return result;
}

export function set<T extends Record<string, unknown>>(
  selectedLens: Lens,
  value: unknown,
  obj: T | null | undefined
): T {
  const base = (obj && typeof obj === 'object' && !Array.isArray(obj))
    ? { ...obj }
    : {} as T;

  if (!selectedLens.path) {
    return value as T;
  }

  const keys = selectedLens.path.split('.');
  let current: Record<string, unknown> = base;
  let sourceCursor: unknown = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    const sourceBranch =
      sourceCursor && typeof sourceCursor === 'object'
        ? (sourceCursor as Record<string, unknown>)[key]
        : undefined;

    const nextBranch =
      sourceBranch && typeof sourceBranch === 'object' && !Array.isArray(sourceBranch)
        ? { ...(sourceBranch as Record<string, unknown>) }
        : {};

    current[key] = nextBranch;

    current = nextBranch;
    sourceCursor = sourceBranch;
  }

  current[keys[keys.length - 1]] = value;

  return base;
}