import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Cv } from '../../model/cv';
import { EmbaucheService } from '../../service/embauche.service';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-embauche-list',
  styleUrl: './embauche-list.css',
  templateUrl: './embauche-list.html',
})
export class EmbaucheList {
  private embaucheService = inject(EmbaucheService);
  embauches = this.embaucheService.getEmbauches();

  licencier(cv: Cv) {
    this.embaucheService.licencier(cv);
  }
}
