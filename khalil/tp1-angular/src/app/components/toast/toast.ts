import { Component, inject } from '@angular/core';
import { ToastService } from '../../service/toast.service';

@Component({
  imports: [],
  selector: 'app-toast',
  styleUrl: './toast.css',
  templateUrl: './toast.html',
})
export class Toast {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;
}
