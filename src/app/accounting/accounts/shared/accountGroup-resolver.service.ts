import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import { AccountGroupService } from '../../accountGroup';

@Injectable()
export class AccountGroupResolver implements Resolve<{ [key: string]: string }> {
  constructor(    private accountGroupService: AccountGroupService) { }

  public resolve() {
    return this.accountGroupService.getAccountGroupDictionary()
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
