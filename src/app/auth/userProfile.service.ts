import { Injectable } from '@angular/core';
import isNil from 'lodash/isNil';

import { Store } from '../shared/store';
import { UserTypes } from '../core';

@Injectable()
export class UserProfileService {
  constructor(private store: Store) { }

  public isSiteAdmin(): boolean {
    let auth = this.store.getState().auth;
    if (isNil) { return false; }
    let userTypes = auth.userType;

    return userTypes.indexOf(UserTypes.siteAdmin) !== -1;
  }
}
