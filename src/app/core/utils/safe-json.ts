import { Result, ok, err } from './result';

export function safeJsonParse<T = unknown>(raw: string | null): Result<T, Error> {
  if (raw == null) return err(new Error('No Input'));
  try {
    const parsed = JSON.parse(raw) as unknown;
    return ok(parsed as T);
  } catch (e) {
    return err(e instanceof Error ? e : new Error(String(e)));
  }
}
