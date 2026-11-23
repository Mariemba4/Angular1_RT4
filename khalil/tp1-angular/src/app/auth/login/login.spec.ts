import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Login } from './login';
import { AuthService } from '../service/auth.service';
import { ToastService } from '../../service/toast.service';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        AuthService,
        {
          provide: ToastService,
          useValue: { show: () => {} },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('connecte l\'utilisateur et navigue vers /cv lors de la soumission', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.email.set('test@insat.tn');
    component.password.set('password123');
    component.onSubmit();

    expect(authService.isAuthenticated()).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/cv']);
  });

  async function saisirEmail(valeur: string) {
    await fixture.whenStable();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    input.value = valeur;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.text-danger')?.textContent.trim();
  }

  it("affiche un message sous l'email s'il est vide", async () => {
    expect(await saisirEmail('')).toBe("L'email est obligatoire");
  });

  it("affiche un message sous l'email s'il est invalide et désactive le bouton", async () => {
    expect(await saisirEmail('abc')).toBe("L'email n'est pas valide");
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
  });

  it("n'affiche aucun message si l'email est valide", async () => {
    expect(await saisirEmail('test@insat.tn')).toBeUndefined();
  });
});
