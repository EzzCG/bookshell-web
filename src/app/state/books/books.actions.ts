import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../../features/books/models/book';

export const BooksActions = createActionGroup({
  source: 'Books/API',
  events: {
    // Trigger search (UI -> effect)
    'Search Books': props<{ q?: string }>(),
    // Effect -> reducer
    'Search Books Success': props<{ books: Book[]; q?: string; fromCache?: boolean }>(),
    // Effect -> reducer (error)
    'Search Books Failure': props<{ error: unknown; q?: string }>(),

    // placeholders for full CRUD - we'll add real ones later
    'Load Book': props<{ id: string }>(),
    'Load Book Success': props<{ book: Book }>(),
    'Load Book Failure': props<{ error: unknown }>(),

    'Create Book': props<{ payload: Partial<Book> }>(),
    'Create Book Success': props<{ book: Book }>(),
    'Create Book Failure': props<{ error: unknown }>(),

    'Update Book': props<{ id: string; changes: Partial<Book> }>(),
    'Update Book Success': props<{ book: Book }>(),
    'Update Book Failure': props<{ error: unknown }>(),

    'Delete Book': props<{ id: string }>(),
    'Delete Book Success': props<{ id: string }>(),
    'Delete Book Failure': props<{ error: unknown }>(),
  },
});

export const BooksPageActions = createActionGroup({
  source: 'Books Page',
  events: {
    Enter: props<{ initialQuery?: string }>(), // page init
    'Query Changed': props<{ query: string }>(), // from input
    'Load Book': props<{ id: string }>(),
    'Create Book': props<{ payload: Partial<Book> }>(),
    'Update Book': props<{ id: string; payload: Partial<Book> }>(),
    'Delete Book': props<{ id: string }>(),

    'Clear Selected Book': emptyProps(),
  },
});

export const BooksApiActions = createActionGroup({
  source: 'Books API',
  events: {
    'Search Success': props<{ query: string; books: Book[] }>(),
    'Search Failure': props<{ query: string; error: unknown }>(),

    'Load Book Success': props<{ book: Book | null }>(),
    'Load Book Failure': props<{ error: unknown }>(),

    'Create Book Success': props<{ book: Book }>(),
    'Create Book Failure': props<{ error: unknown }>(),

    'Update Book Success': props<{ book: Book }>(),
    'Update Book Failure': props<{ error: unknown }>(),

    'Delete Book Success': props<{ id: string }>(),
    'Delete Book Failure': props<{ error: unknown }>(),
  },
});
