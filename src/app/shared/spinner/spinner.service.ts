import { Injectable } from '@angular/core';

import {
  StoreHelper,
  StateHelper
} from '../store';

@Injectable()
export class SpinnerService {

  constructor(private storeHelper: StoreHelper) { }

  public show(): void {
    this.storeHelper.update(StateHelper.showSpinner, true);
  }

  public hide(): void {
    this.storeHelper.update(StateHelper.showSpinner, false);
  }
}
