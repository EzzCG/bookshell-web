import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books-search.component.html',
  styleUrl: './books-search.component.scss',
})
export class BooksSearch {
  @Input() control = new FormControl('');
  @Output() cleared = new EventEmitter<void>();

  clear() {
    this.control.setValue('');
    // this.cleared.emit(); //not needed
  }
}
