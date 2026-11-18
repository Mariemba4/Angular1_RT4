import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EmbaucheService } from '../../service/embauche.service';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-embauche-list',
  styleUrl: './embauche-list.css',
  templateUrl: './embauche-list.html',
})
export class EmbaucheList {
  embauches = inject(EmbaucheService).getEmbauches();
}
