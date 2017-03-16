import { Injectable } from '@angular/core';
import { isNil } from 'lodash';

import { Store } from '../../shared/store';
import {
  UserTypes,
  Accounting
} from '../../core';

@Injectable()
export class UserProfileService {
  constructor(private store: Store) { }

  public isSiteAdmin(): boolean {
    const auth = this.store.getState().auth;
    if (isNil(auth)) { return false; }
    const userTypes = auth.userType;

    return userTypes.indexOf(UserTypes.siteAdmin) !== -1;
  }

  public getOrgId(): number {
    return this.store.getState().auth.organizationId[0] || 0;
  }

  public isAccountGroupManager(): boolean {
    const auth = this.store.getState().auth;
    if (isNil(auth) || isNil(auth.accounting)) { return false; }

    return auth.accounting.indexOf(Accounting.accountGroupManager) !== -1;
  }

  public isItemGroupManager(): boolean {
    const auth = this.store.getState().auth;
    if (isNil(auth) || isNil(auth.accounting)) { return false; }

    return auth.accounting.indexOf(Accounting.accountGroupManager) !== -1;
  }
}
