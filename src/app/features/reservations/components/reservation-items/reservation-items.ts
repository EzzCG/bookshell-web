import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { BooksSearch } from '../../../books/components/books-search/books-search.component';
import { CommonModule } from '@angular/common';

interface BookOption {
  id: number;
  title: string;
  author: string;
}

@Component({
  selector: 'app-reservation-items',
  imports: [ReactiveFormsModule, BooksSearch, CommonModule],
  templateUrl: './reservation-items.html',
  styleUrl: './reservation-items.scss',
})
export class ReservationItems {
  @Input({ required: true }) items!: FormArray;
  @Input({ required: true }) bookSuggestions!: Record<number, BookOption[]>;

  @Output() addItemClicked = new EventEmitter<void>();
  @Output() removeItemClicked = new EventEmitter<number>();
  @Output() bookSelected = new EventEmitter<{ index: number; book: BookOption }>();

  addItem(): void {
    this.addItemClicked.emit();
  }

  removeItem(index: number): void {
    this.removeItemClicked.emit(index);
  }

  selectBook(index: number, book: BookOption): void {
    this.bookSelected.emit({ index, book });
  }
}
