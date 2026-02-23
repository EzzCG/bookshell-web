import { Injectable } from '@angular/core';
import { safeJsonParse } from '../utils/safe-json';
// import { ok } from '../utils/result';

@Injectable({
  providedIn: 'root',
})
export class TypedStorage {
  getItem<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    const parsed = safeJsonParse<T>(raw);
    if (parsed.ok) return parsed.value;
    // If parsing fails, remove corrupt item
    localStorage.removeItem(key);
    return null;
  }

  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
