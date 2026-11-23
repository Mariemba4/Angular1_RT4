import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { API } from '../../config/api.config';
import { AuthService } from '../service/auth.service';
import { loginGuard } from './login.guard';

describe('loginGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('autorise l\'accès à /login si l\'utilisateur n\'est pas connecté', () => {
    expect(authService.isLoggedIn()).toBe(false);
    const result = TestBed.runInInjectionContext(() => loginGuard({} as any, {} as any));
    expect(result).toBe(true);
  });

  it('bloque l\'accès à /login et redirige vers /cv si l\'utilisateur est connecté', () => {
    authService.login({ email: 'test@insat.tn', password: 'abcd' }).subscribe();
    TestBed.inject(HttpTestingController).expectOne(API.login).flush({ id: 'token-test', ttl: 1, userId: 1 });
    expect(authService.isLoggedIn()).toBe(true);
    const result = TestBed.runInInjectionContext(() => loginGuard({} as any, {} as any));
    expect(result instanceof UrlTree).toBe(true);
    expect((result as UrlTree).toString()).toBe('/cv');
  });
});
