import { createFeatureSelector, createSelector } from '@ngrx/store';
import { booksFeatureKey, BookState } from './books.reducer';

export const selectBooksState = createFeatureSelector<BookState>(booksFeatureKey);

export const selectQuery = createSelector(selectBooksState, (state) => state.query);

export const selectBooks = createSelector(selectBooksState, (state) => state.books ?? []);

export const selectBooksOrNull = createSelector(selectBooksState, (state) => state.books);

export const selectLoading = createSelector(selectBooksState, (state) => state.loading);

export const selectError = createSelector(selectBooksState, (state) => state.error);

export const selectSelectedBook = createSelector(selectBooksState, (state) => state.selectedBook);

export const selectSelectedBookLoading = createSelector(
  selectBooksState,
  (state) => state.selectedBookLoading,
);

export const selectSelectedBookError = createSelector(
  selectBooksState,
  (state) => state.selectedBookError,
);

export const selectCreating = createSelector(selectBooksState, (state) => state.creating);

export const selectUpdating = createSelector(selectBooksState, (state) => state.updating);

export const selectDeleting = createSelector(selectBooksState, (state) => state.deleting);

export const selectMutationError = createSelector(selectBooksState, (state) => state.mutationError);

export const selectSaving = createSelector(
  selectCreating,
  selectUpdating,
  (creating, updating) => creating || updating,
);

export const selectVm = createSelector(
  selectBooks,
  selectLoading,
  selectQuery,
  selectSelectedBook,
  selectSelectedBookLoading,
  selectCreating,
  selectUpdating,
  selectDeleting,
  (books, loading, query, selectedBook, selectedBookLoading, creating, updating, deleting) => ({
    books,
    loading,
    query,
    selectedBook,
    selectedBookLoading,
    creating,
    updating,
    deleting,
    saving: creating || updating,
  }),
);
