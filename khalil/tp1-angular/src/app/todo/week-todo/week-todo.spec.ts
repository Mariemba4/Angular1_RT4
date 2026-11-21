import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekTodo } from './week-todo';

describe('WeekTodo', () => {
  let component: WeekTodo;
  let fixture: ComponentFixture<WeekTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekTodo],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekTodo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
