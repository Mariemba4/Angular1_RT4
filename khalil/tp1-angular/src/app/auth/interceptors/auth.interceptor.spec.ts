import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API } from '../../config/api.config';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it("ajoute le token dans l'en-tête Authorization si l'utilisateur est connecté", () => {
    localStorage.setItem('token', 'token-api');
    http.delete(API.cv + 1).subscribe();

    const req = httpMock.expectOne(API.cv + 1);
    expect(req.request.headers.get('Authorization')).toBe('token-api');
    req.flush({});
  });

  it("laisse la requête intacte si l'utilisateur n'est pas connecté", () => {
    http.get(API.cv).subscribe();

    const req = httpMock.expectOne(API.cv);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush([]);
  });
});
