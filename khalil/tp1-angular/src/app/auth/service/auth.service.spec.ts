import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API } from '../../config/api.config';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it("garde le token renvoyé par l'API (champ id) puis l'efface au logout", () => {
    service.login({ email: 'test@insat.tn', password: 'abcd' }).subscribe();
    httpMock.expectOne(API.login).flush({ id: 'token-api', ttl: 1209600, userId: 1 });

    expect(service.getToken()).toBe('token-api');
    expect(service.isLoggedIn()).toBe(true);

    service.logout();
    expect(service.getToken()).toBeNull();
    expect(service.isLoggedIn()).toBe(false);
  });
});
