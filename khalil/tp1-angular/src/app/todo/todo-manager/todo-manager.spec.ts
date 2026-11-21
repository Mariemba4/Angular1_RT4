import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoManager } from './todo-manager';

describe('TodoManager', () => {
  let component: TodoManager;
  let fixture: ComponentFixture<TodoManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoManager],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
