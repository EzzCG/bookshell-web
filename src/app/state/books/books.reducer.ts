import { createReducer, on } from '@ngrx/store';
import { BooksApiActions, BooksPageActions } from './books.actions';
import { Book } from '../../features/books/models/book';

export const booksFeatureKey = 'books';
export interface BookState {
  query: string;
  books: Book[] | null; // null before first load, to show skeletons
  loading: boolean;
  error: unknown | null;

  selectedBook: Book | null;
  selectedBookLoading: boolean;
  selectedBookError: unknown | null;

  creating: boolean;
  updating: boolean;
  deleting: boolean;
  mutationError: unknown | null;
}
export const initialState: BookState = {
  query: '',
  books: null,
  loading: false,
  error: null,

  selectedBook: null,
  selectedBookLoading: false,
  selectedBookError: null,

  creating: false,
  updating: false,
  deleting: false,
  mutationError: null,
};

// function upsertBookInList(books: Book[] | null, book: Book): Book[] | null {
//   if (!books) return books;

//   const exists = books.some((b) => b.id === book.id);
//   if (!exists) return [book, ...books];

//   return books.map((b) => (b.id === book.id ? book : b));
// }

function updateBookInList(books: Book[] | null, book: Book): Book[] | null {
  if (!books) return books;
  return books.map((b) => (b.id === book.id ? book : b));
}

function removeBookFromList(books: Book[] | null, id: string): Book[] | null {
  if (!books) return books;
  return books.filter((b) => b.id !== id);
}

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

  on(BooksPageActions.loadBook, (state) => ({
    ...state,
    selectedBook: null,
    selectedBookLoading: true,
    selectedBookError: null,
  })),

  on(BooksApiActions.loadBookSuccess, (state, { book }) => ({
    ...state,
    selectedBook: book,
    selectedBookLoading: false,
    selectedBookError: null,
  })),

  on(BooksApiActions.loadBookFailure, (state, { error }) => ({
    ...state,
    selectedBook: null,
    selectedBookLoading: false,
    selectedBookError: error,
  })),

  on(BooksPageActions.createBook, (state) => ({
    ...state,
    creating: true,
    mutationError: null,
  })),

  on(BooksApiActions.createBookSuccess, (state, { book }) => ({
    ...state,
    selectedBook: book,
    creating: false,
    mutationError: null,
  })),

  on(BooksApiActions.createBookFailure, (state, { error }) => ({
    ...state,
    creating: false,
    mutationError: error,
  })),

  on(BooksPageActions.updateBook, (state) => ({
    ...state,
    updating: true,
    mutationError: null,
  })),

  on(BooksApiActions.updateBookSuccess, (state, { book }) => ({
    ...state,
    selectedBook: book,
    updating: false,
    mutationError: null,
    books: updateBookInList(state.books, book),
  })),

  on(BooksApiActions.updateBookFailure, (state, { error }) => ({
    ...state,
    updating: false,
    mutationError: error,
  })),

  on(BooksPageActions.deleteBook, (state) => ({
    ...state,
    deleting: true,
    mutationError: null,
  })),

  on(BooksApiActions.deleteBookSuccess, (state, { id }) => ({
    ...state,
    selectedBook: state.selectedBook?.id === id ? state.selectedBook : null, //if the deleted book is currently selected, delete it, if not, keep the same selected book
    deleting: false,
    mutationError: null,
    books: removeBookFromList(state.books, id),
  })),

  on(BooksApiActions.deleteBookFailure, (state, { error }) => ({
    ...state,
    deleting: false,
    mutationError: error,
  })),
);
