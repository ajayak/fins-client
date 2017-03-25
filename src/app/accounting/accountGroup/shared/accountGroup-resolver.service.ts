import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';

import { AccountGroupService } from './accountGroup.service';
import { mapObjectToArray } from '../../../shared/helpers';

@Injectable()
export class AccountGroupResolver implements Resolve<{ [key: string]: string }> {
  constructor(private accountGroupService: AccountGroupService) { }

  public resolve() {
    return this.accountGroupService.getAccountGroupDictionary()
      .map(accountGroups => {
        if (accountGroups) {
          return mapObjectToArray(accountGroups);
        }
        return Observable.of(null);
      })
      .catch((error: any) => {
        return Observable.of(null);
      });
  }
}
