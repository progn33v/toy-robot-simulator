import { Injectable } from '@angular/core';
import { ToastrService, ActiveToast, IndividualConfig } from 'ngx-toastr';

const options: Partial<IndividualConfig> = {
  closeButton: false,
  timeOut: 2000,
  progressBar: true,
  progressAnimation: 'increasing',
  toastClass: 'ngx-toastr',
  positionClass: 'toast-top-right',
  tapToDismiss: true,
  newestOnTop: true,
};

@Injectable()
export class NotifyService {
  options = options;

  constructor(private service: ToastrService) {}

  success(
    message: string,
    title: string,
  ): ActiveToast<any> {
    return this.service.success(message, title, options);
  }

  error(
    message: string,
    title: string,
  ): ActiveToast<any> {
    return this.service.error(message, title, options);
  }

  warning(
    message: string,
    title: string,
  ): ActiveToast<any> {
    return this.service.warning(message, title, options);
  }
}
