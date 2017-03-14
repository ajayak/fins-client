import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { AccountGroupService } from '../../accountGroup';
import { UserProfileService } from '../../../auth';

@Injectable()
export class AccountGroupResolver implements Resolve<{ [key: string]: string }> {
  constructor(
    private accountGroupService: AccountGroupService,
    private profile: UserProfileService,
  ) { }

  public resolve() {
    const orgId = this.profile.getOrgId();

    return this.accountGroupService.getAccountGroupDictionary(orgId)
      .map(accountGroups => {
        if (accountGroups) {
          return this.mapObjectToArray(accountGroups);
        }
        return Observable.of(null);
      })
      .catch((error: any) => {
        return Observable.of(null);
      });
  }

  private mapObjectToArray(obj): Array<{}> {
    return Object.keys(obj)
      .map(id => ({ id: `${id}`, value: obj[id] }));
  }
}
