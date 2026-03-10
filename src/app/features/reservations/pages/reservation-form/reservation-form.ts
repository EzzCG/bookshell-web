import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { CreateReservationDto } from '../../models/reservation.model';
import { BooksService } from '../../../books/services/book.service';
import { ClientSectionComponent } from '../../components/client-section/client-section';
import { ReservationDetails } from '../../components/reservation-details/reservation-details';
import { ReservationItems } from '../../components/reservation-items/reservation-items';

interface BookOption {
  id: number;
  title: string;
  author: string;
}

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientSectionComponent,
    ReservationItems,
    ReservationDetails,
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm {
  private fb = inject(FormBuilder);
  private booksService = inject(BooksService);
  private destroyRef = inject(DestroyRef);

  bookSuggestions = signal<Record<number, BookOption[]>>({});

  reservationForm = this.fb.nonNullable.group({
    client: this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    }),
    reservationDetails: this.fb.nonNullable.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      notes: [''],
    }),
    items: this.fb.array([this.createItemGroup()]),
  });

  constructor() {
    this.setupSearchForAllRows();
  }

  get items(): FormArray {
    return this.reservationForm.get('items') as FormArray;
  }

  get clientGroup(): FormGroup {
    return this.reservationForm.get('client') as FormGroup;
  }

  get reservationDetailsGroup(): FormGroup {
    return this.reservationForm.get('reservationDetails') as FormGroup;
  }

  createItemGroup(): FormGroup {
    return this.fb.nonNullable.group({
      bookSearch: [''],
      bookId: [null as number | null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      days: [1, [Validators.required, Validators.min(1)]],
      comment: [''],
    });
  }

  addItem(): void {
    this.items.push(this.createItemGroup());
    this.setupSearchForRow(this.items.length - 1);
  }

  removeItem(index: number): void {
    if (this.items.length === 1) return;

    this.items.removeAt(index);

    const current = { ...this.bookSuggestions() };
    delete current[index];
    this.bookSuggestions.set(current);
  }

  private setupSearchForAllRows(): void {
    this.items.controls.forEach((_, index) => this.setupSearchForRow(index));
  }

  private setupSearchForRow(index: number): void {
    const group = this.items.at(index) as FormGroup;
    const searchControl = group.get('bookSearch') as FormControl | null;

    if (!searchControl) return;

    searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          const query = String(value ?? '').trim();

          if (!query) {
            return of([]);
          }

          return this.booksService.search(query).pipe(catchError(() => of([])));
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((books) => {
        const mapped: BookOption[] = books.map((book) => ({
          id: Number(book.id),
          title: book.title,
          author: book.author,
        }));

        this.bookSuggestions.update((state) => ({
          ...state,
          [index]: mapped,
        }));
      });
  }

  onBookSelected(event: { index: number; book: BookOption }): void {
    const group = this.items.at(event.index) as FormGroup;

    group.patchValue({
      bookSearch: `${event.book.title} — ${event.book.author}`,
      bookId: event.book.id,
    });

    this.bookSuggestions.update((state) => ({
      ...state,
      [event.index]: [],
    }));
  }

  submit(): void {
    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    const raw = this.reservationForm.getRawValue() as CreateReservationDto;

    const payload: CreateReservationDto = {
      client: {
        name: raw.client.name,
        email: raw.client.email,
        phone: raw.client.phone || undefined,
      },
      reservationDetails: {
        startDate: raw.reservationDetails.startDate,
        endDate: raw.reservationDetails.endDate,
        notes: raw.reservationDetails.notes || undefined,
      },
      items: raw.items.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
        days: item.days,
        comment: item.comment || undefined,
      })),
    };

    console.log('RAW FORM VALUE:', raw);
    console.log('RESERVATION DTO:', payload);
  }
}
