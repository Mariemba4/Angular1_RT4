import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastService } from '../../service/toast.service';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  email = signal('admin@gmail.com');
  password = signal('admin123');

  onSubmit(): void {
    if (!this.email() || !this.password()) {
      this.toastService.show('Veuillez renseigner tous les champs', 'warning');
      return;
    }
    this.authService.login({ email: this.email(), password: this.password() });
    this.toastService.show('Connexion réussie !', 'success');
    this.router.navigate(['/cv']);
  }
}
