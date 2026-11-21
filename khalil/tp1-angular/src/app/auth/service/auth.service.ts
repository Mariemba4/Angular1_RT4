import { Service, signal } from '@angular/core';
import { Credentials } from '../model/credentials';

@Service()
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly _isLoggedIn = signal<boolean>(this.isAuthenticated());

  /** Signal d'état exposé en lecture seule : empêche toute modification arbitraire (.set()) de l'extérieur. */
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  /** Vérifie la présence du token dans le localStorage. */
  isAuthenticated(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Enregistre le token dans le localStorage et met à jour le signal d'état de connexion.
   */
  login(credentials?: Credentials, token = 'fake-jwt-token'): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      this._isLoggedIn.set(true);
    }
  }

  /**
   * Supprime le token du localStorage et met à jour le signal d'état de connexion.
   */
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      this._isLoggedIn.set(false);
    }
  }

  /** Retourne le token actuel ou null. */
  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }
}
