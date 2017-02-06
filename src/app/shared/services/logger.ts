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
    this.toastr.info({ titleText: message });
  }

  public error(message: string, data?: any) {
    if (isProduction) { return; }
    console.error(message, data);
    this.toastr.error({ titleText: message });
  }

  public warn(message: string, data?: any) {
    if (isProduction) { return; }
    console.warn(message, data);
    this.toastr.warn({ titleText: message });
  }

  public info(message: string, data?: any) {
    if (isProduction) { return; }
    console.info(message, data);
    this.toastr.info({ titleText: message });
  }
}
