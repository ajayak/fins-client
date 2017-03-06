import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import isNil from 'lodash/isNil';
import sortBy from 'lodash/sortBy';
import { TreeNode } from 'primeng/components/common/api';

import { ApiService } from '../../../shared/services';
import { AccountGroup } from './accountGroup.model';
import { config } from '../../../core';
import { UserProfileService } from '../../../auth/shared';
import { transformToTree } from '../../../shared';
import {
  StoreHelper,
  StateHelper,
  Store
} from '../../../shared';

@Injectable()
export class AccountGroupService {
  private accountGroupUrl: string = config.urls.accountGroup;

  constructor(
    private apiService: ApiService,
    private user: UserProfileService,
    private storeHelper: StoreHelper,
    private store: Store) { }

  public getAccountGroup(orgId?: number): Observable<AccountGroup[]> {
    let url = config.urls.accountGroup;
    if (this.user.isSiteAdmin()) {
      url += `/${orgId}`;
    }
    return this.apiService.get(url)
      .do(result => this.storeHelper.update(StateHelper.accountGroups, result));
  }

  public accountGroupExistsInOrganization
    (parentAccountGroupId: number, name: string, originalName: string): boolean {
    const accountGroups = this.store.getState().accountGroups;
    if (isNil(accountGroups)) { return false; }

    const items = accountGroups
      .filter(item => item.parentId === parentAccountGroupId &&
        item.name.toLowerCase() === name.toLowerCase() &&
        item.name.toLowerCase() !== originalName.toLowerCase());
    return items.length > 0;
  }

  public addAccountGroup(accountGroup: AccountGroup): Observable<AccountGroup> {
    return this.apiService
      .post(config.urls.accountGroup, accountGroup)
      .do(result => this.addAccountGroupInState(accountGroup, result));
  }

  public updateAccountGroup(accountGroup: AccountGroup): Observable<AccountGroup> {
    return this.apiService
      .put(config.urls.accountGroup, accountGroup)
      .do(result => {
        this.storeHelper.findAndAddOrUpdateInArray(StateHelper.accountGroups, result);
      });
  }

  public deleteAccountGroup
    (orgId: number, accountGroupId: number): Observable<boolean> {
    let url = config.urls.deleteAccountGroup
      .replace(/accountGroupId/i, `${accountGroupId}`)
      .replace(/orgId/i, `${orgId}`);
    return this.apiService.delete(url)
      .do(result => {
        if (result === true) { this.deleteAccountGroupFromState(accountGroupId); }
      });
  }

  public convertAccountGroupsToTreeNode(accountGroups: AccountGroup[]): TreeNode[] {
    if (isNil(accountGroups)) { return []; };
    accountGroups = sortBy(accountGroups, (ag: AccountGroup) => ag.name.toLowerCase());
    let treeNodes: TreeNode[] = accountGroups.map(accountGroup => {
      let treeNode: TreeNode = {
        label: accountGroup.name,
        data: accountGroup.displayName,
        expandedIcon: 'fa-folder-open',
        collapsedIcon: 'fa-folder'
      };
      treeNode['id'] = accountGroup.id;
      treeNode['parentId'] = accountGroup.parentId;
      return treeNode;
    });
    return transformToTree(treeNodes) as TreeNode[];
  }

  private addAccountGroupInState
    (accountGroup: AccountGroup, updatedAccountGroup: AccountGroup) {
    if (accountGroup.parentId !== 0) {
      const state = this.store.getState();
      const parent = state.accountGroups.filter(c => c.id === accountGroup.parentId);
      const updatedParent = { ...parent[0], isPrimary: false };
      this.storeHelper.findAndAddOrUpdateInArray(StateHelper.accountGroups, updatedParent);
    }
    this.storeHelper.findAndAddOrUpdateInArray(StateHelper.accountGroups, updatedAccountGroup);
  }

  private deleteAccountGroupFromState(accountGroupId: number) {
    const accountGroups = this.store.getState().accountGroups;
    const accountGroup = accountGroups.filter(ag => ag.id === accountGroupId)[0];
    const parentAccountGroup = accountGroups.filter(ag => ag.id === accountGroup.parentId)[0];
    if (!isNil(parentAccountGroup)) {
      const childAccountGroups = accountGroups.filter(ag => ag.parentId === parentAccountGroup.id);
      if (childAccountGroups.length === 1) {
        const updatedParentAccountGroup = {
          ...parentAccountGroup,
          isPrimary: true
        };
        this.storeHelper
          .findAndAddOrUpdateInArray(StateHelper.accountGroups, updatedParentAccountGroup);
      }
    }
    this.storeHelper.findAndDelete(StateHelper.accountGroups, accountGroupId);
  }
}
