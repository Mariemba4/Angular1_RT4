import { Directive, signal } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  host: {
    '[style.color]': 'color()',
    '[style.borderColor]': 'color()',
    '(keyup)': 'changeColor()',
  },
})
export class Rainbow {
  color = signal('');

  changeColor() {
    this.color.set(this.randomColor());
  }

  private randomColor(): string {
    const channel = () => Math.floor(Math.random() * 256);
    return `rgb(${channel()}, ${channel()}, ${channel()})`;
  }
}
