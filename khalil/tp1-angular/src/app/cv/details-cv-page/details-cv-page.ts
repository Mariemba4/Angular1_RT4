import { NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { Cv } from '../model/cv';
import { CvService } from '../service/cv.service';
import { ToastService } from '../../service/toast.service';

@Component({
  imports: [NgOptimizedImage, RouterLink],
  selector: 'app-details-cv-page',
  styleUrl: './details-cv-page.css',
  templateUrl: './details-cv-page.html',
})
export class DetailsCvPage {
  private acr = inject(ActivatedRoute);
  private router = inject(Router);
  private cvService = inject(CvService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  cv = signal<Cv | null>(null);

  constructor() {
    const id = Number(this.acr.snapshot.paramMap.get('id'));
    this.cvService.getCvById(id).subscribe({
      next: (cv) => this.cv.set(cv),
      error: () => {
        const fakeCv = this.cvService.getFakeCvById(id);
        if (fakeCv) {
          this.cv.set(fakeCv);
          this.toastService.show("Problème d'accès à l'API, le détail affiché est fictif", 'danger');
        } else {
          this.toastService.show(`Le cv d'id ${id} n'existe pas`, 'warning');
          this.router.navigate(['/cv']);
        }
      },
    });
  }

  deleteCv() {
    const cv = this.cv();
    if (!cv) return;
    const nom = `${cv.firstname} ${cv.name}`;
    this.cvService.deleteCv(cv.id).subscribe({
      next: () => {
        this.toastService.show(`${nom} a été supprimé avec succès`, 'success');
        this.router.navigate(['/cv']);
      },
      error: (erreur: HttpErrorResponse) => {
        if (erreur.status === 401) {
          // Pas de token ou token expiré : on oublie l'ancien token et on renvoie vers le login
          this.authService.logout();
          this.toastService.show('Vous devez être connecté pour supprimer un cv', 'warning');
          this.router.navigate(['/login']);
          return;
        }
        if (this.cvService.deleteFakeCv(cv.id)) {
          this.toastService.show(
            `Problème d'accès à l'API, ${nom} a été supprimé de la liste fictive`,
            'warning',
          );
          this.router.navigate(['/cv']);
        } else {
          this.toastService.show(`La suppression de ${nom} a échoué`, 'danger');
        }
      },
    });
  }
}
