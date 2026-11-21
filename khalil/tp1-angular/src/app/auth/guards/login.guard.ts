import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

/**
 * Guard qui interdit l'accès à la page Login aux personnes déjà connectées.
 * - Si l'utilisateur est connecté : redirection vers /cv (UrlTree).
 * - Si l'utilisateur n'est pas connecté : accès autorisé (true).
 */
export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/cv']);
  }
  return true;
};
