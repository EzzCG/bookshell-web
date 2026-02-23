import { inject, Injectable } from '@angular/core';
import { HttpTypedClient } from '../http/http-typed-client';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { TypedStorage } from './typed-storage.service';
import { NotificationService } from './notification.service';
import { User, isUser } from '../../features/auth/models/user';
import { LoginResponse, MeResponse } from '../../features/auth/models/auth-responses';
import { environment } from '../../../environments/environment.prod';
import { normalizeLoginResponse, normalizeMeResponse } from '../api/normalizers';

const TOKEN_KEY = 'bs_token';
const REFRESH_TOKEN_KEY = 'bs_refresh_token';
const USER_KEY = 'bs_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient = inject(HttpTypedClient);
  private notification = inject(NotificationService);
  private storage = inject(TypedStorage);

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        // 1) normalize raw server response to our LoginResponse shape
        map((raw) => normalizeLoginResponse(raw)),

        // 2) validate shape & fail early if required fields missing
        map((res) => {
          if (!res?.accessToken) throw new Error('No token in login response');
          if (!res?.user) throw new Error('No user in login response');
          return res;
        }),

        // 3) side effects (store token) and notifications
        tap(() => this.notification.info('Logging in...')),
        tap((res) => {
          this.storage.setItem(TOKEN_KEY, res.accessToken);
          this.storage.setItem(USER_KEY, res.user);
          if (res.refreshToken) this.storage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
          this.notification.success(`Welcome ${res.user.name ?? res.user.email}`);
        }),

        // 4) return only the user to callers
        map((res) => res.user),

        // 5) error handling
        catchError((err) => {
          this.notification.error('Login failed: ' + (err?.message || 'Invalid email or password'));
          return throwError(() => err);
        }),
      );
  }

  logout() {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(REFRESH_TOKEN_KEY);
    this.storage.removeItem(USER_KEY);
  }

  getToken(): string | null {
    return this.storage.getItem<string>(TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.storage.getItem<string>(REFRESH_TOKEN_KEY);
  }

  me(): Observable<User> {
    return this.httpClient.get<MeResponse>(`${environment.apiUrl}/auth/me`).pipe(
      map((raw) => normalizeMeResponse(raw)),
      map((r) => {
        if (!r?.user || !isUser(r.user)) throw new Error('Invalid me response');
        return r.user;
      }),
      tap((user) => this.storage.setItem(USER_KEY, user)),
      catchError((err) => {
        this.notification.error('Session expired. Please log in again.');
        this.logout();
        return throwError(() => err);
      }),
    );
  }

  getStoredUser(): User | null {
    return this.storage.getItem<User>(USER_KEY);
  }
}
