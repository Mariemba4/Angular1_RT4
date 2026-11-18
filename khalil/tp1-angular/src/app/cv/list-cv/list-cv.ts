import { Component, input, output } from '@angular/core';
import { Cv } from '../../model/cv';
import { ItemCv } from '../item-cv/item-cv';

@Component({
  imports: [ItemCv],
  selector: 'app-list-cv',
  styleUrl: './list-cv.css',
  templateUrl: './list-cv.html',
})
export class ListCv {
  cvs = input.required<Cv[]>();
  selectCv = output<Cv>();
}
