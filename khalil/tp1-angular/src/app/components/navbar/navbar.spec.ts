import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';
import { API } from '../../config/api.config';
import { AuthService } from '../../auth/service/auth.service';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let authService: AuthService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('affiche le lien Login quand l\'utilisateur n\'est pas connecté', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Login');
    expect(el.textContent).not.toContain('Déconnexion');
  });

  it('affiche Déconnexion quand l\'utilisateur est connecté', () => {
    authService.login({ email: 'test@insat.tn', password: 'abcd' }).subscribe();
    TestBed.inject(HttpTestingController).expectOne(API.login).flush({ id: 'token-test', ttl: 1, userId: 1 });
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Déconnexion');
    expect(el.textContent).toContain('Connecté');
  });
});
