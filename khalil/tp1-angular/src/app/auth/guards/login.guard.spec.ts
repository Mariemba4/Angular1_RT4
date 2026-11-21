import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { loginGuard } from './login.guard';

describe('loginGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('autorise l\'accès à /login si l\'utilisateur n\'est pas connecté', () => {
    expect(authService.isAuthenticated()).toBe(false);
    const result = TestBed.runInInjectionContext(() => loginGuard({} as any, {} as any));
    expect(result).toBe(true);
  });

  it('bloque l\'accès à /login et redirige vers /cv si l\'utilisateur est connecté', () => {
    authService.login();
    expect(authService.isAuthenticated()).toBe(true);
    const result = TestBed.runInInjectionContext(() => loginGuard({} as any, {} as any));
    expect(result instanceof UrlTree).toBe(true);
    expect((result as UrlTree).toString()).toBe('/cv');
  });
});
