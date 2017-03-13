import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../shared/services';
import { config } from '../../../core';
import {
  AccountPageList,
  AccountList
} from './account-list.model';
import { UserProfileService } from '../../../auth';

@Injectable()
export class AccountService {

  constructor(
    private apiService: ApiService,
    private user: UserProfileService) { }

  public getAllAccounts
    (pageNo?: number, pageSize?: number, sort?: string, orgId?: number):
    Observable<AccountPageList> {
    let url = config.urls.account;
    if (this.user.isSiteAdmin()) {
      url += `/${orgId}`;
    }
    url += `?pageNo=${pageNo || 1}&pageSize=${pageSize || 0}&sort=${sort || ''}`;
    return this.apiService.get(url);
  }

  public getAccount(accountId: number): Observable<AccountList> {
    return Observable.of(null);
  }
}