import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { BookCard } from '../book-card/book-card.component';

@Component({
  selector: 'app-books-grid',
  standalone: true,
  imports: [CommonModule, BookCard],
  templateUrl: './books-grid.component.html',
  styleUrl: './books-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksGrid {
  @Input() books: Book[] | null = [];
  @Output() edit = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<Book>();

  trackById(_: number, b: Book) {
    return b.id;
  }
}
