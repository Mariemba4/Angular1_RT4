import { Component } from '@angular/core';
import { TodoManager } from '../todo-manager/todo-manager';

@Component({
  imports: [TodoManager],
  selector: 'app-week-todo',
  styleUrl: './week-todo.css',
  templateUrl: './week-todo.html',
})
export class WeekTodo {
  readonly days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
}
