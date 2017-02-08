import { Injectable } from '@angular/core';

import {
  Store,
  StoreHelper,
  StateHelper
} from '../../shared';

@Injectable()
export class SideNavService {

  constructor(
    private store: Store,
    private storeHelper: StoreHelper) { }

  public show() {
    this.storeHelper.update(StateHelper.openSideNav, true);
  }

  public hide() {
    this.storeHelper.update(StateHelper.openSideNav, false);
  }

  public toggle() {
    const state = this.store.getState();
    this.storeHelper.update(StateHelper.openSideNav, !state.showSpinner);
  }
}
