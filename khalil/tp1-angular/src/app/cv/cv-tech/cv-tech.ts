import { Component, inject, signal } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../service/cv.service';
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
  cvs = inject(CvService).getCvs();
  selectedCv = signal<Cv | null>(null);

  onSelectCv(cv: Cv) {
    this.selectedCv.set(cv);
  }
}
