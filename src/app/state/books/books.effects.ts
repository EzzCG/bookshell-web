import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksApiActions, BooksPageActions } from './books.actions';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  map,
  merge,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { BooksService } from '../../features/books/services/book.service';

@Injectable()
export class BooksSearchEffects {
  private actions$ = inject(Actions);
  private booksService = inject(BooksService);

  // Stream of queries from both Enter (initial load) and Query Changed
  private query$ = merge(
    this.actions$.pipe(
      ofType(BooksPageActions.enter),
      map(({ initialQuery }) => initialQuery ?? ''),
      tap((q) => console.log('[BooksSearchEffects] Enter with query ', q)),
    ),
    this.actions$.pipe(
      ofType(BooksPageActions.queryChanged),
      map(({ query }) => query),
      debounceTime(300),
    ),
  ).pipe(
    map((q) => q.trim().toLowerCase()),
    distinctUntilChanged(),
  );

  search$ = createEffect(() =>
    this.query$.pipe(
      switchMap((query) =>
        this.booksService.search(query).pipe(
          map((books) => BooksApiActions.searchSuccess({ query, books })),
          catchError((error) => of(BooksApiActions.searchFailure({ query, error }))),
        ),
      ),
    ),
  );

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.loadBook),
      switchMap(({ id }) =>
        this.booksService.get(id).pipe(
          map((book) => BooksApiActions.loadBookSuccess({ book })),
          catchError((error) => of(BooksApiActions.loadBookFailure({ error }))),
        ),
      ),
    ),
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.createBook),
      exhaustMap(({ payload }) =>
        this.booksService.create(payload).pipe(
          map((book) => BooksApiActions.createBookSuccess({ book })),
          catchError((error) => of(BooksApiActions.createBookFailure({ error }))),
        ),
      ),
    ),
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.updateBook),
      exhaustMap(({ id, payload }) =>
        this.booksService.update(id, payload).pipe(
          map((book) => BooksApiActions.updateBookSuccess({ book })),
          catchError((error) => of(BooksApiActions.updateBookFailure({ error }))),
        ),
      ),
    ),
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.deleteBook),
      exhaustMap(({ id }) =>
        this.booksService.delete(id).pipe(
          map(() => BooksApiActions.deleteBookSuccess({ id })),
          catchError((error) => of(BooksApiActions.deleteBookFailure({ error }))),
        ),
      ),
    ),
  );
}
