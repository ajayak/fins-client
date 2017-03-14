import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  ToastOptions,
  ToastService,
  ToastType
} from './toast';

@Injectable()
export class LogService {
  constructor(private toastr: ToastService) { }

  public log(message: string, data?: any): void {
    if (environment.production) { return; }
    console.log(message, data);
  }

  public error(message: string, data?: any) {
    if (environment.production) { return; }
    console.error(message, data);
    this.toastr.error({
      title: message,
      html: this.getFormattedHtml(data)
    });
  }

  public warn(message: string, data?: any) {
    if (environment.production) { return; }
    console.warn(message, data);
    this.toastr.warn({
      title: message,
      html: this.getFormattedHtml(data)
    });
  }

  public info(message: string, data?: any) {
    if (environment.production) { return; }
    // tslint:disable-next-line:no-console
    console.info(message, data);
    this.toastr.info({
      title: message,
      html: this.getFormattedHtml(data)
    });
  }

  private getFormattedHtml(data: any): string {
    return `<pre class="logger-text">${JSON.stringify(data, null, 2)}</pre>`;
  }
}
