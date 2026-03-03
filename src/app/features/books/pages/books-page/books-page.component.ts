import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Book } from '../../models/book';
import { BooksGrid } from '../../components/books-grid/books-grid.component';
import { BooksSearch } from '../../components/books-search/books-search.component';
import { Store } from '@ngrx/store';
import {
  selectBooks,
  selectBooksSearchState,
  selectLoading,
} from '../../../../state/books/books.selectors';
import { BooksPageActions } from '../../../../state/books/books.actions';

@Component({
  standalone: true,
  selector: 'app-books-page',
  imports: [CommonModule, ReactiveFormsModule, BooksGrid, BooksSearch],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPage {
  // private service = inject(BooksService);
  private store = inject(Store);

  searchControl = new FormControl('', { nonNullable: true });

  loading$ = this.store.select(selectLoading);
  books$ = this.store.select(selectBooks);

  skeletonCount = Array.from({ length: 8 }); // Creates an array [undefined, undefined, ..., undefined] of length 8 for skeleton placeholders

  constructor() {
    // initial load
    this.store.dispatch(BooksPageActions.enter({ initialQuery: '' }));

    // subscribe to search with debounce + cancel
    this.searchControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.store.dispatch(BooksPageActions.queryChanged({ query: value }));
    });

    this.store.subscribe((state) => console.log('ROOT STATE', state));
  }

  onEdit(book: Book) {
    console.log('edit', book);
    // TODO: open edit dialog
  }

  onDelete(book: Book) {
    console.log('delete', book);
    // TODO: confirm + call service
  }
}
