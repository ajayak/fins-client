import { Injectable } from '@angular/core';

import { isProduction } from '../../environment';

@Injectable()
export class LoggerService {
  public log(message: string, data?: any): void {
    if (isProduction) { return; }
    console.log(message, data);
  }
}
