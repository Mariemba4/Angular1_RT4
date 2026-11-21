import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

@Component({
  imports: [FormsModule],
  selector: 'app-todo-manager',
  styleUrl: './todo-manager.css',
  templateUrl: './todo-manager.html',
  providers: [TodoService],
})
export class TodoManager {
  private todoService = inject(TodoService);
  todos = this.todoService.getTodos();
  name = signal('');
  content = signal('');

  addTodo() {
    if (!this.name().trim()) return;
    this.todoService.addTodo({ name: this.name(), content: this.content() });
    this.name.set('');
    this.content.set('');
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
