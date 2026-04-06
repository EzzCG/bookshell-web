import { Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth.guard';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BooksSearchEffects } from './state/books/books.effects';
import { booksFeatureKey, booksReducer } from './state/books/books.reducer';

export const routes: Routes = [
  {
    path: 'books',
    loadComponent: () =>
      import('./features/books/pages/books-page/books-page.component').then((m) => m.BooksPage),
    // canActivate: [authGuard],
    providers: [provideState(booksFeatureKey, booksReducer), provideEffects(BooksSearchEffects)],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'reservations/new',
    loadComponent: () =>
      import('./features/reservations/pages/reservation-form/reservation-form').then(
        (m) => m.ReservationForm,
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
