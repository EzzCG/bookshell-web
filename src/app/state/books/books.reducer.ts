import { createReducer, on } from '@ngrx/store';
import { BooksApiActions, BooksPageActions } from './books.actions';
import { Book } from '../../features/books/models/book';

export const booksSearchFeatureKey = 'booksSearch';

export interface BooksSearchState {
  query: string;
  books: Book[] | null; // null before first load, to show skeletons
  loading: boolean;
  error: unknown | null;
}
export const initialState: BooksSearchState = {
  query: '',
  books: null,
  loading: false,
  error: null,
};

export const booksSearchReducer = createReducer(
  initialState,

  on(BooksPageActions.enter, (state, { initialQuery }) => ({
    ...state,
    query: (initialQuery ?? '').trim().toLowerCase(),
    loading: true,
    error: null,
  })),

  on(BooksPageActions.queryChanged, (state, { query }) => ({
    ...state,
    query: query.trim().toLowerCase(),
    loading: true,
    error: null,
    // keep old books while loading like your current code does
  })),

  on(BooksApiActions.searchSuccess, (state, { query, books }) => ({
    ...state,
    query,
    books,
    loading: false,
    error: null,
  })),

  on(BooksApiActions.searchFailure, (state, { query, error }) => ({
    ...state,
    query,
    books: [], // you currently fallback to []
    loading: false,
    error,
  })),
);
