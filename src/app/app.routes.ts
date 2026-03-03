import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BooksSearchEffects } from './state/books/books.effects';
import { booksSearchFeatureKey, booksSearchReducer } from './state/books/books.reducer';

export const routes: Routes = [
  {
    path: 'books',
    loadComponent: () =>
      import('./features/books/pages/books-page/books-page.component').then((m) => m.BooksPage),
    // canActivate: [authGuard],
    providers: [
      provideState(booksSearchFeatureKey, booksSearchReducer),
      provideEffects(BooksSearchEffects),
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
