import { Component, inject, signal } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../service/cv.service';
import { ToastService } from '../../service/toast.service';
import { DetailCv } from '../detail-cv/detail-cv';
import { EmbaucheList } from '../embauche-list/embauche-list';
import { ListCv } from '../list-cv/list-cv';

@Component({
  imports: [ListCv, DetailCv, EmbaucheList],
  selector: 'app-cv-tech',
  styleUrl: './cv-tech.css',
  templateUrl: './cv-tech.html',
})
export class CvTech {
  private cvService = inject(CvService);
  private toastService = inject(ToastService);

  cvs = signal<Cv[]>([]);
  selectedCv = signal<Cv | null>(null);

  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => this.cvs.set(cvs),
      error: () => {
        this.cvs.set(this.cvService.getFakeCvs());
        this.toastService.show("Problème d'accès à l'API, les données affichées sont fictives", 'danger');
      },
    });
  }

  onSelectCv(cv: Cv) {
    this.cvService.getCvById(cv.id).subscribe({
      next: (cvApi) => this.selectedCv.set(cvApi),
      error: () => {
        this.selectedCv.set(this.cvService.getFakeCvById(cv.id) ?? cv);
        this.toastService.show("Problème d'accès à l'API, le détail affiché est fictif", 'danger');
      },
    });
  }
}
