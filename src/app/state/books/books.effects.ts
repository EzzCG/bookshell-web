import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BooksApiActions, BooksPageActions } from './books.actions';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
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
}
