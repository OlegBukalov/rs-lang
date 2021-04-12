import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string): void {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-center',
    });
  }

  showError(message: string, title: string): void {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-center',
    });
  }

  showShow(message: string, title: string, customProperties?: Partial<IndividualConfig>): void {
    this.toastr.show(message, title, customProperties);
  }

  showWarning(message: string, title: string): void {
    this.toastr.warning(message, title, {
      positionClass: 'toast-top-center',
    });
  }

  showInfo(message: string, title: string): void {
    this.toastr.info(message, title, {
      positionClass: 'toast-top-center',
    });
  }

  showCustomAlert(
    message: string,
    title: string,
    customProperties: Partial<IndividualConfig>,
  ): void {
    this.toastr.show(message, title, customProperties);
  }
}
