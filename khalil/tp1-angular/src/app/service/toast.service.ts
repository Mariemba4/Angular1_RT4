import { inject, Service } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export type ToastType = 'success' | 'warning' | 'danger';

@Service()
export class ToastService {
  private toastr = inject(ToastrService);

  show(text: string, type: ToastType, duration = 3000) {
    const options = { timeOut: duration };
    switch (type) {
      case 'success':
        this.toastr.success(text, undefined, options);
        break;
      case 'warning':
        this.toastr.warning(text, undefined, options);
        break;
      case 'danger':
        this.toastr.error(text, undefined, options);
        break;
    }
  }
}
