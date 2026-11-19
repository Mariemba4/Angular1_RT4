import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, NgStyle],
  selector: 'app-mini-word',
  styleUrl: './mini-word.css',
  templateUrl: './mini-word.html',
})
export class MiniWord {
  readonly fonts = ['arial', 'Verdana', 'Garamond'];
  color = signal('#198754');
  size = signal(30);
  font = signal('arial');
}
