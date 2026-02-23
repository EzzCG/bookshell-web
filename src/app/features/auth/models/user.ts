export interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

export function isUser(x: unknown): x is User {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o['id'] === 'string' && typeof o['email'] === 'string';
}
