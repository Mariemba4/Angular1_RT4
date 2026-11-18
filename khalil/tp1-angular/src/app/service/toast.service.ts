import { Service, signal } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'danger';

export interface ToastMessage {
  id: number;
  text: string;
  type: ToastType;
}

@Service()
export class ToastService {
  private nextId = 0;
  private messages = signal<ToastMessage[]>([]);
  readonly toasts = this.messages.asReadonly();

  show(text: string, type: ToastType, duration = 3000) {
    const id = this.nextId++;
    this.messages.update((list) => [...list, { id, text, type }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this.messages.update((list) => list.filter((toast) => toast.id !== id));
  }
}
