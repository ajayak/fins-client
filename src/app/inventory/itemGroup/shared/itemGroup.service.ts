import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  isNil,
  sortBy
} from 'lodash';
import { TreeNode } from 'primeng/components/common/api';

import { ApiService } from '../../../shared/services';
import { ItemGroup } from './itemGroup.model';
import { config } from '../../../core';
import { UserProfileService } from '../../../auth/shared';
import { transformToTree } from '../../../shared';
import {
  StoreHelper,
  StateHelper,
  Store
} from '../../../shared';

@Injectable()
export class ItemGroupService {
  constructor(
    private apiService: ApiService,
    private user: UserProfileService,
    private storeHelper: StoreHelper,
    private store: Store) { }

  public getItemGroup(orgId?: number): Observable<ItemGroup[]> {
    let url = config.urls.itemGroup;
    if (this.user.isSiteAdmin()) {
      url += `/${orgId}`;
    }
    return this.apiService.get(url)
      .do(result => this.storeHelper.update(StateHelper.itemGroups, result));
  }

  public getItemGroupDictionary(orgId?: number): Observable<{ [key: string]: string }> {
    let url = config.urls.itemGroupDictionary;
    if (this.user.isSiteAdmin()) {
      url += `/${orgId}`;
    }
    return this.apiService.get(url);
  }

  public itemGroupExistsInOrganization
    (parentItemGroupId: number, name: string, originalName: string): boolean {
    const ItemGroups = this.store.getState().itemGroups;
    if (isNil(ItemGroups)) { return false; }

    const items = ItemGroups
      .filter(item => item.parentId === parentItemGroupId &&
        item.name.toLowerCase() === name.toLowerCase() &&
        item.name.toLowerCase() !== originalName.toLowerCase());
    return items.length > 0;
  }

  public addItemGroup(ItemGroup: ItemGroup): Observable<ItemGroup> {
    return this.apiService
      .post(config.urls.itemGroup, ItemGroup)
      .do(result => this.addItemGroupInState(ItemGroup, result));
  }

  public updateItemGroup(ItemGroup: ItemGroup): Observable<ItemGroup> {
    return this.apiService
      .put(config.urls.itemGroup, ItemGroup)
      .do(result => {
        this.storeHelper.findAndAddOrUpdateInArray(StateHelper.itemGroups, result);
      });
  }

  public deleteItemGroup
    (orgId: number, ItemGroupId: number): Observable<boolean> {
    const url = config.urls.deleteItemGroup
      .replace(/ItemGroupId/i, `${ItemGroupId}`)
      .replace(/orgId/i, `${orgId}`);
    return this.apiService.delete(url)
      .do(result => {
        if (result === true) { this.deleteItemGroupFromState(ItemGroupId); }
      });
  }

  public convertItemGroupsToTreeNode(ItemGroups: ItemGroup[]): TreeNode[] {
    if (isNil(ItemGroups)) { return []; };
    ItemGroups = sortBy(ItemGroups, (ag: ItemGroup) => ag.name.toLowerCase());
    const treeNodes: TreeNode[] = ItemGroups.map(ItemGroup => {
      const treeNode: TreeNode = {
        label: ItemGroup.name,
        data: ItemGroup.displayName,
        expandedIcon: 'fa-folder-open',
        collapsedIcon: 'fa-folder'
      };
      treeNode['id'] = ItemGroup.id;
      treeNode['parentId'] = ItemGroup.parentId;
      return treeNode;
    });
    return transformToTree(treeNodes) as TreeNode[];
  }

  private addItemGroupInState
    (ItemGroup: ItemGroup, updatedItemGroup: ItemGroup) {
    if (ItemGroup.parentId !== 0) {
      const state = this.store.getState();
      const parent = state.itemGroups.filter(c => c.id === ItemGroup.parentId);
      const updatedParent = { ...parent[0], isPrimary: false };
      this.storeHelper.findAndAddOrUpdateInArray(StateHelper.itemGroups, updatedParent);
    }
    this.storeHelper.findAndAddOrUpdateInArray(StateHelper.itemGroups, updatedItemGroup);
  }

  private deleteItemGroupFromState(ItemGroupId: number) {
    const ItemGroups = this.store.getState().itemGroups;
    const ItemGroup = ItemGroups.filter(ag => ag.id === ItemGroupId)[0];
    const parentItemGroup = ItemGroups.filter(ag => ag.id === ItemGroup.parentId)[0];
    if (!isNil(parentItemGroup)) {
      const childItemGroups = ItemGroups.filter(ag => ag.parentId === parentItemGroup.id);
      if (childItemGroups.length === 1) {
        const updatedParentItemGroup = {
          ...parentItemGroup,
          isPrimary: true
        };
        this.storeHelper
          .findAndAddOrUpdateInArray(StateHelper.itemGroups, updatedParentItemGroup);
      }
    }
    this.storeHelper.findAndDelete(StateHelper.itemGroups, ItemGroupId);
  }
}
