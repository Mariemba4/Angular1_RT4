import { Component, signal } from '@angular/core';
@Component({
  imports: [],
  selector: 'app-color',
  styleUrl: './color.css',
  templateUrl: './color.html',
})
export class Color {
  readonly defaultColor = 'red';
  color = signal(this.defaultColor);

  changeColor(newColor: string) {
    this.color.set(newColor);
  }

  reset() {
    this.color.set(this.defaultColor);
  }
}