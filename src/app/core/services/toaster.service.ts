import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private readonly defaultTopCenterPosition: Partial<IndividualConfig> = {
    positionClass: 'toast-top-center',
  };

  constructor(private toastr: ToastrService) {}

  showSuccess(
    message: string,
    title: string,
    customProperties: Partial<IndividualConfig> = this.defaultTopCenterPosition,
  ): void {
    this.toastr.success(message, title, customProperties);
  }

  showError(
    message: string,
    title: string,
    customProperties: Partial<IndividualConfig> = this.defaultTopCenterPosition,
  ): void {
    this.toastr.error(message, title, customProperties);
  }

  showShow(
    message: string,
    title: string,
    customProperties: Partial<IndividualConfig> = this.defaultTopCenterPosition,
  ): void {
    this.toastr.show(message, title, customProperties);
  }

  showWarning(
    message: string,
    title: string,
    customProperties: Partial<IndividualConfig> = this.defaultTopCenterPosition,
  ): void {
    this.toastr.warning(message, title, customProperties);
  }

  showInfo(
    message: string,
    title: string,
    customProperties: Partial<IndividualConfig> = this.defaultTopCenterPosition,
  ): void {
    this.toastr.info(message, title, customProperties);
  }

  showCustomToastr(
    type: ToastrType,
    message: string,
    title: string,
    customProperties: Partial<IndividualConfig> = this.defaultTopCenterPosition,
  ): void {
    this.toastr[type](message, title, customProperties);
  }
}

export enum ToastrType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Show = 'show',
}
