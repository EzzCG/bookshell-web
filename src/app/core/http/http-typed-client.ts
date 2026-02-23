import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type SimpleHeaders = Record<string, string | string[]>;
type SimpleParams = Record<string, string | string[]>;

interface HttpOptions {
  headers?: HttpHeaders | SimpleHeaders;
  params?: HttpParams | SimpleParams;
  observe?: 'body'; // expand as needed
  responseType?: 'json'; // expand as needed
  // add other options you need (reportProgress, withCredentials, etc.)
}
@Injectable({ providedIn: 'root' })
export class HttpTypedClient {
  private http = inject(HttpClient);

  // get<T>(url: string, options?: { headers?: HttpHeaders | Record<string, string> }): Observable<T> {
  get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post<T, B = unknown>(url: string, body: B, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  put<T, B = unknown>(url: string, body: B, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(url, body, options);
  }

  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(url, options);
  }
}
