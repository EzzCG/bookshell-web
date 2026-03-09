import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectBooks,
  selectLoading,
  selectSelectedBook,
  selectSelectedBookLoading,
  selectCreating,
  selectUpdating,
  selectDeleting,
  selectVm,
} from './books.selectors';
import { Book } from '../../features/books/models/book';
import { BooksPageActions } from './books.actions';

@Injectable({ providedIn: 'root' })
export class BooksFacade {
  private store = inject(Store);

  readonly books$ = this.store.select(selectBooks);
  readonly loading$ = this.store.select(selectLoading);
  readonly selectedBook$ = this.store.select(selectSelectedBook);
  readonly selectedBookLoading$ = this.store.select(selectSelectedBookLoading);
  readonly creating$ = this.store.select(selectCreating);
  readonly updating$ = this.store.select(selectUpdating);
  readonly deleting$ = this.store.select(selectDeleting);
  readonly vm$ = this.store.select(selectVm);

  enter(initialQuery = ''): void {
    this.store.dispatch(BooksPageActions.enter({ initialQuery }));
  }

  search(query: string): void {
    this.store.dispatch(BooksPageActions.queryChanged({ query }));
  }

  loadBook(id: string): void {
    this.store.dispatch(BooksPageActions.loadBook({ id }));
  }

  clearSelectedBook(): void {
    this.store.dispatch(BooksPageActions.clearSelectedBook());
  }

  createBook(payload: Partial<Book>): void {
    this.store.dispatch(BooksPageActions.createBook({ payload }));
  }

  updateBook(id: string, payload: Partial<Book>): void {
    this.store.dispatch(BooksPageActions.updateBook({ id, payload }));
  }

  deleteBook(id: string): void {
    this.store.dispatch(BooksPageActions.deleteBook({ id }));
  }
}
