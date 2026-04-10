export type Lens = {
  path: string;
};

export function lens(path: string): Lens {
  return { path };
}

function getByPath(value: unknown, path: string): unknown {
  if (value === null || value === undefined) {
    return undefined;
  }

  const parts = path.split('.');
  let current: unknown = value;

  for (let index = 0; index < parts.length; index += 1) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[parts[index]];
  }

  return current;
}

function cloneBranch(value: unknown): Record<string, unknown> {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return { ...(value as Record<string, unknown>) };
  }

  return {};
}

export function view<T>(selectedLens: Lens, source: T | null | undefined): unknown {
  if (!selectedLens.path) {
    return source;
  }

  return getByPath(source, selectedLens.path);
}

export function set<T extends Record<string, unknown>>(
  selectedLens: Lens,
  value: unknown,
  source: T | null | undefined,
): T {
  const baseObject = cloneBranch(source) as T;

  if (!selectedLens.path) {
    return value as T;
  }

  const parts = selectedLens.path.split('.');
  let current: Record<string, unknown> = baseObject;
  let sourceCursor: unknown = source;

  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index];
    const sourceBranch = sourceCursor !== null && typeof sourceCursor === 'object'
      ? (sourceCursor as Record<string, unknown>)[part]
      : undefined;

    const nextBranch = cloneBranch(sourceBranch);
    current[part] = nextBranch;

    current = nextBranch;
    sourceCursor = sourceBranch;
  }

  current[parts[parts.length - 1]] = value;

  return baseObject;
}
