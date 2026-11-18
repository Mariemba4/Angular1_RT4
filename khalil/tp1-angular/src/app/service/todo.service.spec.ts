import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = TestBed.inject(TodoService);
  });

  it('ajoute puis supprime un todo', () => {
    const todo = { name: 'Lundi', content: 'Faire du sport' };
    service.addTodo(todo);
    expect(service.getTodos()()).toEqual([todo]);
    service.deleteTodo(todo);
    expect(service.getTodos()()).toEqual([]);
  });
});
