import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../../shared/services';
import { config } from '../../../core';
import { AccountPageList } from './account-list.model';
import { Account } from './account.model';
import { UserProfileService } from '../../../auth';

@Injectable()
export class AccountService {
  private accountUrl = config.urls.account;

  constructor(
    private apiService: ApiService,
    private user: UserProfileService) { }

  public getAllAccounts
    (pageNo?: number, pageSize?: number, sort?: string):
    Observable<AccountPageList> {
    let url = this.accountUrl;
    url += `?pageNo=${pageNo || 1}&pageSize=${pageSize || 0}&sort=${sort || ''}`;
    return this.apiService.get(url);
  }

  public getAccount(accountId: number): Observable<Account> {
    return this.apiService.get(`${this.accountUrl}/${accountId}`);
  }

  public addAccount(account: Account): Observable<Account> {
    return this.apiService.post(this.accountUrl, account);
  }

  public updateAccount(account: Account): Observable<Account> {
    return this.apiService.put(this.accountUrl, account);
  }

  public deleteAccount(accountId: number): Observable<boolean> {
    return this.apiService.delete(`${this.accountUrl}/${accountId}`);
  }
}
