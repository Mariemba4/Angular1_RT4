import { Component, inject, output } from '@angular/core';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../service/embauche.service';
import { ListCv } from '../list-cv/list-cv';

@Component({
  imports: [ListCv],
  selector: 'app-embauche-list',
  styleUrl: './embauche-list.css',
  templateUrl: './embauche-list.html',
})
export class EmbaucheList {
  embauches = inject(EmbaucheService).getEmbauches();
  selectCv = output<Cv>();

  onSelectCv(cv: Cv) {
    this.selectCv.emit(cv);
  }
}
