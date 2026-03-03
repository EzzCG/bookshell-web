import { createFeatureSelector, createSelector } from '@ngrx/store';
import { booksSearchFeatureKey, BooksSearchState } from './books.reducer';

export const selectBooksSearchState =
  createFeatureSelector<BooksSearchState>(booksSearchFeatureKey);

export const selectQuery = createSelector(selectBooksSearchState, (s) => s.query as string);

export const selectBooks = createSelector(
  selectBooksSearchState,
  (s) => s.books, // Book[] | null
);

export const selectLoading = createSelector(selectBooksSearchState, (s) => s.loading as boolean);

export const selectError = createSelector(selectBooksSearchState, (s) => s.error);
