import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Credentials } from '../model/credentials';
import { AuthService } from '../service/auth.service';
import { ToastService } from '../../service/toast.service';
import { blacklistValidator } from '../validators/blacklist.validator';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  loginModel = signal<Credentials>({ email: '', password: '' });

  loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: "L'email est obligatoire" });
    email(path.email, { message: "L'email n'est pas valide" });
    blacklistValidator(path.email);
    required(path.password);
    minLength(path.password, 4);
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.loginForm().invalid()) {
      this.toastService.show('Veuillez remplir correctement tous les champs', 'warning');
      return;
    }
    this.authService.login(this.loginModel());
    this.toastService.show('Connexion réussie !', 'success');
    this.router.navigate(['/cv']);
  }
}
