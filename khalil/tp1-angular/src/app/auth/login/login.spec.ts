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
});
