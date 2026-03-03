import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { booksSearchFeatureKey, booksSearchReducer } from './state/books/books.reducer';
import { BooksSearchEffects } from './state/books/books.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideHttpClient(),

    importProvidersFrom(MatSnackBarModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
