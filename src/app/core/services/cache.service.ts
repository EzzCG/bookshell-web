import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, throwError } from 'rxjs';

/**
 * Simple generic cache that stores observables (usually HTTP calls)
 * and returns the same shared observable until invalidated.
 */
@Injectable({ providedIn: 'root' })
export class CacheService {
  private cache = new Map<string, Observable<unknown>>();

  getOrLoad<T>(key: string, loader: () => Observable<T>): Observable<T> {
    const existing = this.cache.get(key) as Observable<T> | undefined;
    if (existing) return existing;
    const obs$ = loader().pipe(
      shareReplay(1), // share result so multiple subscribers share same HTTP
      catchError((err) => {
        this.cache.delete(key); // remove the cached observable so next call retries
        return throwError(() => err);
      }),
    );
    // store as unknown to satisfy Map, but type preserved on return
    this.cache.set(key, obs$ as Observable<unknown>);
    return obs$;
  }

  set<T>(key: string, observable$: Observable<T>) {
    this.cache.set(key, observable$ as Observable<unknown>);
  }

  has(key: string) {
    return this.cache.has(key);
  }

  invalidate(key: string) {
    this.cache.delete(key);
  }

  invalidatePrefix(prefix: string) {
    for (const k of Array.from(this.cache.keys())) {
      if (k.startsWith(prefix)) this.cache.delete(k);
    }
  }

  clear() {
    this.cache.clear();
  }
}
