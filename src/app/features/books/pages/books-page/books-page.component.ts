import { Component, effect, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, tap, of, catchError, map } from 'rxjs';
import { Book } from '../../models/book';
import { BooksGrid } from '../../components/books-grid/books-grid.component';
import { BooksSearch } from '../../components/books-search/books-search.component';
import { BooksService } from '../../services/book.service';

@Component({
  standalone: true,
  selector: 'app-books-page',
  imports: [CommonModule, ReactiveFormsModule, BooksGrid, BooksSearch],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPage {
  // private service = inject(MockBooksService);
  private service = inject(BooksService);
  searchControl = new FormControl('', { nonNullable: true });
  loading = signal(false);
  books = signal<Book[] | null>(null);
  skeletonCount = Array.from({ length: 8 }); // Creates an array [undefined, undefined, ..., undefined] of length 8 for skeleton placeholders

  constructor() {
    // initial load
    this.load('');

    // subscribe to search with debounce + cancel
    this.searchControl.valueChanges
      .pipe(
        takeUntilDestroyed(),
        debounceTime(300),
        map((searchString) => searchString.trim().toLowerCase()),
        distinctUntilChanged(),
        tap(() => this.loading.set(true)),
        switchMap((q: string) =>
          this.service.search(q).pipe(
            catchError(() => of([])), // fallback to empty on error
          ),
        ),
      )
      .subscribe((list) => {
        this.books.set(list);
        this.loading.set(false);
      });

    // optional reactive side-effect: whenever books change, log count (example of effect + signals)
    effect(() => {
      const current = this.books();
      console.debug('[BooksPage] books length', current?.length ?? 0);
    });
  }

  private load(q: string) {
    this.loading.set(true);
    this.service
      .search(q)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (list) => {
          this.books.set(list);
          this.loading.set(false);
        },
        error: () => {
          this.books.set([]);
          this.loading.set(false);
        },
      });
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
