import { Injectable, inject } from '@angular/core';
import { HttpTypedClient } from '../../../core/http/http-typed-client';
import { CacheService } from '../../../core/services/cache.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Book } from '../models/book';
import { Observable, catchError, of, tap, shareReplay } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

const BOOKS_CACHE_PREFIX = 'books:';
const BOOK_GET_PREFIX = 'book:';

export function booksCacheKey(q?: string) {
  return `${BOOKS_CACHE_PREFIX}${(q ?? '').trim().toLowerCase() || '__all'}`;
}

@Injectable({ providedIn: 'root' })
export class BooksService {
  private http = inject(HttpTypedClient);
  private cache = inject(CacheService);
  private notification = inject(NotificationService);

  /** Search books (cached per query). */
  search(q?: string): Observable<Book[]> {
    const key = booksCacheKey(q);

    return this.cache.getOrLoad<Book[]>(key, () => {
      // create params
      let params = new HttpParams();
      if (q) params = params.set('q', q);

      const loader$ = this.http.get<Book[]>(`${environment.apiUrl}/books`, { params });

      return loader$;
    });
  }

  /** Get single book (cached by id) */
  get(id: string): Observable<Book | null> {
    const key = `${BOOK_GET_PREFIX}${id}`;
    return this.cache.getOrLoad<Book | null>(key, () =>
      this.http.get<Book>(`${environment.apiUrl}/books/${id}`),
    );
  }

  /** Create book and invalidate search cache */
  create(payload: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${environment.apiUrl}/books`, payload).pipe(
      tap(() => {
        this.invalidateCache();
        this.notification.success('Book created.');
      }),
      catchError((err) => {
        this.notification.error('Failed to create book.');
        console.error('[BooksService] create error', err);
        throw err;
      }),
    );
  }

  /** Update book and invalidate caches */
  update(id: string, payload: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${environment.apiUrl}/books/${id}`, payload).pipe(
      tap((b) => {
        // update cached single item
        const key = `${BOOK_GET_PREFIX}${id}`;
        this.cache.set(key, of(b).pipe(shareReplay(1)));
        this.invalidateCache(); // invalidate listing caches
        this.notification.success('Book updated.');
      }),
      catchError((err) => {
        this.notification.error('Failed to update book.');
        console.error('[BooksService] update error', err);
        throw err;
      }),
    );
  }

  /** Delete book and invalidate caches */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/books/${id}`).pipe(
      tap(() => {
        this.cache.invalidate(`${BOOK_GET_PREFIX}${id}`);
        this.invalidateCache();
        this.notification.success('Book deleted.');
      }),
      catchError((err) => {
        this.notification.error('Failed to delete book.');
        console.error('[BooksService] delete error', err);
        throw err;
      }),
    );
  }

  /** Invalidate all search caches (keeps individual get caches optional) */
  invalidateCache() {
    this.cache.invalidatePrefix(BOOKS_CACHE_PREFIX);
  }
}
