import { Component } from '@angular/core';
import { Rainbow } from '../../directives/rainbow';

@Component({
  imports: [Rainbow],
  selector: 'app-rgb',
  styleUrl: './rgb.css',
  templateUrl: './rgb.html',
})
export class Rgb {}
