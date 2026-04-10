import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Book } from '../../models/book';
import { BooksGrid } from '../../components/books-grid/books-grid.component';
import { BooksSearch } from '../../components/books-search/books-search.component';
import { BooksFacade } from '../../../../state/books/books.facade';
// import { Apollo, gql } from 'apollo-angular';
// import { map } from 'rxjs';

// const GET_BOOKS = gql`
//   query {
//     books {
//       id
//       title
//       author
//       year
//       imageUrl
//     }
//   }
// `;
@Component({
  standalone: true,
  selector: 'app-books-page',
  imports: [CommonModule, ReactiveFormsModule, BooksGrid, BooksSearch],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPage {
  // private service = inject(BooksService);
  private booksFacade = inject(BooksFacade);
  // private apollo = inject(Apollo);

  searchControl = new FormControl('', { nonNullable: true });

  loading$ = this.booksFacade.loading$;
  books$ = this.booksFacade.books$;
  // books$ = this.apollo
  //   .watchQuery<{ books: Book[] }>({ query: GET_BOOKS })
  //   .valueChanges.pipe(map((result) => (result.data?.books ?? []) as Book[]));

  skeletonCount = Array.from({ length: 8 }); // Creates an array [undefined, undefined, ..., undefined] of length 8 for skeleton placeholders

  constructor() {
    // initial load
    this.booksFacade.enter('');

    // subscribe to search with debounce + cancel
    this.searchControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.booksFacade.search(value);
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
