import { Injectable } from '@angular/core';

import { isProduction } from '../../environment';
import {
  ToastOptions,
  ToastService,
  ToastType
} from './toast';

@Injectable()
export class LoggerService {

  constructor(private toastr: ToastService) { }

  public log(message: string, data?: any): void {
    if (isProduction) { return; }
    console.log(message, data);
    this.toastr.info(message);
  }

  public error(message: string, data: any) {
    if (isProduction) { return; }
    console.error(message, data);
    this.toastr.error(message);
  }

  public warn(message: string, data: any) {
    if (isProduction) { return; }
    console.warn(message, data);
    this.toastr.warn(message);
  }
}
