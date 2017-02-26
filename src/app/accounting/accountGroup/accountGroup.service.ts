import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../shared/services';
import { AccountGroupModel } from './accountGroup.model';
import { config } from '../../core';
import { UserProfileService } from '../../auth/userProfile.service';
import {
  StoreHelper,
  StateHelper
} from '../../shared';

@Injectable()
export class AccountGroupService {
  private accountGroupUrl: string = config.urls.accountGroup;

  constructor(
    private apiService: ApiService,
    private user: UserProfileService,
    private storeHelper: StoreHelper) { }

  public getAccountGroup(orgId?: number): Observable<AccountGroupModel[]> {
    let url = config.urls.accountGroup;
    if (this.user.isSiteAdmin()) {
      url += `/${orgId}`;
    }
    return this.apiService.get(url)
      .do(result => this.storeHelper.update(StateHelper.accountGroups, result));
  }

  public accountGroupExistsInOrganization
    (orgId: number, parentAccountGroupId: number, name: string): Observable<boolean> {
    let url = config.urls.accountGroupExistsInOrg
      .replace(/parentId/i, `${parentAccountGroupId}`)
      .replace(/accountGroupName/i, name)
      .replace(/orgId/i, `${orgId}`);
    return this.apiService.get(url);
  }

  public addAccountGroup(accountGroup: AccountGroupModel): Observable<AccountGroupModel> {
    return this.apiService
      .post(config.urls.accountGroup, accountGroup)
      .do(result => this.storeHelper.findAndAddInArray(StateHelper.accountGroups, result));
  }
}
