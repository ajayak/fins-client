import { Injectable } from '@angular/core';

import { isProduction } from '../../environment';
import {
  ToastOptions,
  ToastService,
  ToastType
} from './toast';

@Injectable()
export class LogService {

  constructor(private toastr: ToastService) { }

  public log(message: string, data?: any): void {
    if (isProduction) { return; }
    console.log(message, data);
    this.toastr.info({
      title: message,
      html: `<pre class="logger-text">${JSON.stringify(data, null, 2)}</pre>`
    });
  }

  public error(message: string, data?: any) {
    if (isProduction) { return; }
    console.error(message, data);
    this.toastr.error({
      title: message,
      html: `<pre class="logger-text">${JSON.stringify(data, null, 2)}</pre>`
    });
  }

  public warn(message: string, data?: any) {
    if (isProduction) { return; }
    console.warn(message, data);
    this.toastr.warn({
      title: message,
      html: `<pre class="logger-text">${JSON.stringify(data, null, 2)}</pre>`
    });
  }

  public info(message: string, data?: any) {
    if (isProduction) { return; }
    console.info(message, data);
    this.toastr.info({
      title: message,
      html: `<pre class="logger-text">${JSON.stringify(data, null, 2)}</pre>`
    });
  }
}
