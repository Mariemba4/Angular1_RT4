import { inject, Service, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { LoggerService } from './logger.service';

@Service()
export class TodoService {
  private logger = inject(LoggerService);
  private todos = signal<Todo[]>([]);

  getTodos() {
    return this.todos.asReadonly();
  }

  addTodo(todo: Todo) {
    this.todos.update((list) => [...list, todo]);
    this.logTodos();
  }

  deleteTodo(todo: Todo) {
    this.todos.update((list) => list.filter((t) => t !== todo));
    this.logTodos();
  }

  logTodos() {
    this.logger.log(this.todos());
  }
}
