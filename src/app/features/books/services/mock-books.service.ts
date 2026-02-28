import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { delay, map, Observable, of } from 'rxjs';

const MOCK: Book[] = [
  { id: '1', title: 'Atomic Habits', author: 'James Clear', year: 2018 },
  { id: '2', title: 'Deep Work', author: 'Cal Newport', year: 2016 },
  { id: '3', title: 'Pragmatic Programmer', author: 'Andrew Hunt', year: 1999 },
  { id: '4', title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
  { id: '5', title: 'The Mythical Man-Month', author: 'Fred Brooks', year: 1975 },
  { id: '6', title: 'Design Patterns', author: 'Gamma et al.', year: 1994 },
];
@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class MockBooksService {
  // Simulate server-side search + pagination optional params
  search(q?: string): Observable<Book[]> {
    const term = q?.trim().toLowerCase() ?? '';
    // Simulate network latency
    return of(MOCK).pipe(
      delay(250),
      map((list) => {
        if (!term) return list;
        return list.filter(
          (b) => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term),
        );
      }),
    );
  }
}
