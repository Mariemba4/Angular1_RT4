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
    component.loginModel.set({ email: 'test@insat.tn', password: 'password123' });
    component.onSubmit(new Event('submit'));

    expect(authService.isAuthenticated()).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/cv']);
  });

  async function saisir(id: string, valeur: string, quitter = true) {
    await fixture.whenStable();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#' + id);
    input.value = valeur;
    input.dispatchEvent(new Event('input'));
    if (quitter) {
      input.dispatchEvent(new Event('blur'));
    }
    await fixture.whenStable();
    fixture.detectChanges();
    return input;
  }

  async function saisirEmail(valeur: string, quitter = true) {
    await saisir('email', valeur, quitter);
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

  it("n'affiche ni message ni bordure rouge au départ", async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.text-danger')).toBeNull();
    expect(fixture.nativeElement.querySelector('.is-invalid')).toBeNull();
  });

  it("affiche le message dès que l'email est modifié, sans quitter le champ", async () => {
    expect(await saisirEmail('abc', false)).toBe("L'email n'est pas valide");
  });

  it('met une bordure rouge si un champ vide est touché', async () => {
    await fixture.whenStable();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(input.classList).toContain('is-invalid');
  });

  it('refuse un mot de passe de moins de 4 caractères', async () => {
    const bouton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    await saisir('email', 'test@insat.tn');
    const input = await saisir('password', 'abc');
    expect(input.classList).toContain('is-invalid');
    expect(bouton.disabled).toBe(true);

    await saisir('password', 'abcd');
    expect(input.classList).not.toContain('is-invalid');
    expect(bouton.disabled).toBe(false);
  });
});
