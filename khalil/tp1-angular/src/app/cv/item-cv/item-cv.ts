import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { Cv } from '../../model/cv';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-item-cv',
  styleUrl: './item-cv.css',
  templateUrl: './item-cv.html',
})
export class ItemCv {
  cv = input.required<Cv>();
}
