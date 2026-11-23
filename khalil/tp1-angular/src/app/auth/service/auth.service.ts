import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API } from '../../config/api.config';
import { Credentials } from '../model/credentials';
import { LoginResponse } from '../model/login-response';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private readonly tokenKey = 'token';
  private readonly _isLoggedIn = signal(!!localStorage.getItem(this.tokenKey));

  /** Seule source de vérité de l'état connecté, en lecture seule pour l'extérieur. */
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  /** Envoie les identifiants à l'API et, en cas de succès, garde le token dans le localStorage. */
  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API.login, credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.id);
        this._isLoggedIn.set(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
