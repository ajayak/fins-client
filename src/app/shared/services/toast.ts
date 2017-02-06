import { Injectable } from '@angular/core';

import sweetalert from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
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

  public prompt(options) {
    const baseOptions: ToastOptions = {
      showCancelButton: true,
      confirmButtonText: 'Submit',
      input: 'text'
    };
    return sweetalert(assign(baseOptions, options));
  }

  public confirm(options) {
    const baseOptions: ToastOptions = {
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      type: 'warning'
    };
    return sweetalert(assign(baseOptions, options));
  }

  public alert(options) {
    const baseOptions: ToastOptions = {
      confirmButtonText: 'OK',
      type: 'info'
    };
    return sweetalert(assign(baseOptions, options));
  }

  public question(options) {
    return this.alert(assign({ type: 'question' }, options));
  }

  public success(options) {
    return this.alert(assign({ type: 'success' }, options));
  }

  public error(options) {
    return this.alert(assign({ type: 'error' }, options));
  }

  public warn(options) {
    return this.alert(assign({ type: 'warn' }, options));
  }

  public info(options) {
    return this.alert(assign({ type: 'info' }, options));
  }
}
