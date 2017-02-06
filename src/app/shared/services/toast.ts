import { Injectable } from '@angular/core';

// CSS imported in Style.scss
import sweetalert from 'sweetalert2';

import {
  SweetAlertOptions,
  SweetAlertType
} from 'sweetalert2';

import assign from 'lodash.assign';

export type ToastType = SweetAlertType;
export interface ToastOptions extends SweetAlertOptions { }

@Injectable()
export class ToastService {
  public fullToast(options: ToastOptions): Promise<any> {
    return sweetalert(options);
  }

  public toast(title: string, message?: string, type?: ToastType): Promise<any> {
    return sweetalert(title, message, type);
  }

  public prompt(options: ToastOptions) {
    const baseOptions: ToastOptions = {
      showCancelButton: true,
      confirmButtonText: 'Submit',
      input: 'text'
    };
    return sweetalert(assign(baseOptions, options));
  }

  public confirm(options: ToastOptions) {
    const baseOptions: ToastOptions = {
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      type: 'warning'
    };
    return sweetalert(assign(baseOptions, options));
  }

  public alert(options: ToastOptions) {
    const baseOptions: ToastOptions = {
      confirmButtonText: 'OK',
      type: 'info'
    };
    return sweetalert(assign(baseOptions, options));
  }

  public question(options: ToastOptions) {
    return this.alert(assign(<ToastOptions>{ type: 'question' }, options));
  }

  public success(options: ToastOptions) {
    return this.alert(assign(<ToastOptions>{ type: 'success' }, options));
  }

  public error(options: ToastOptions) {
    return this.alert(assign(<ToastOptions>{ type: 'error' }, options));
  }

  public warn(options: ToastOptions) {
    return this.alert(assign(<ToastOptions>{ type: 'warning' }, options));
  }

  public info(options: ToastOptions) {
    return this.alert(assign(<ToastOptions>{ type: 'info' }, options));
  }
}
