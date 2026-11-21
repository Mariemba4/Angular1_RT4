import { Routes } from '@angular/router';
import { Color } from './components/color/color';
import { MiniWord } from './components/mini-word/mini-word';
import { Rgb } from './components/rgb/rgb';
import { TodoManager } from './todo/todo-manager/todo-manager';
import { Ttc } from './components/ttc/ttc';
import { WeekTodo } from './todo/week-todo/week-todo';
import { CvTech } from './cv/cv-tech/cv-tech';
import { Login } from './auth/login/login';
import { loginGuard } from './auth/guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'cv', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [loginGuard] },
  { path: 'cv', component: CvTech },
  { path: 'color', component: Color },
  { path: 'ttc', component: Ttc },
  { path: 'word', component: MiniWord },
  { path: 'rgb', component: Rgb },
  { path: 'todo', component: TodoManager },
  { path: 'week', component: WeekTodo },
  { path: '**', redirectTo: 'cv' },
];
