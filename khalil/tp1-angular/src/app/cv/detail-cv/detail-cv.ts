import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { APP_CONST } from '../../config/const.config';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../service/embauche.service';
import { ToastService } from '../../service/toast.service';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-detail-cv',
  styleUrl: './detail-cv.css',
  templateUrl: './detail-cv.html',
})
export class DetailCv {
  private embaucheService = inject(EmbaucheService);
  private toastService = inject(ToastService);
  cv = input.required<Cv>();

  embaucher() {
    const nom = `${this.cv().firstname} ${this.cv().name}`;
    if (!this.embaucheService.embaucher(this.cv())) {
      this.toastService.show(`${nom} est déjà pré embauché`, 'warning');
      return;
    }
    this.toastService.show(`${nom} a été pré embauché avec succès`, 'success');
    if (this.embaucheService.budgetDepasse()) {
      this.toastService.show(
        `Budget dépassé : plus de ${APP_CONST.maxEmbauches} cvs embauchés`,
        'danger',
      );
    }
  }
}
