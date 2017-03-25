import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';
import { isNil } from 'lodash';

import { Store } from '../../shared/store';
import { ToastService } from '../../shared/services';
import {
  ItemGroupService,
  ItemGroup
} from './shared';

@Component({
  selector: 'fs-item-group',
  template: `
  <md-card>
    <md-card-title> Item Groups </md-card-title>
    <md-card-subtitle> Manage Item Groups </md-card-subtitle>
    <md-divider></md-divider>
    <md-card-content>
      <fs-add-item-group 
        [parent]="rootItemGroup"
        (onRootItemGroupAdd)="addItemGroup($event)">
      </fs-add-item-group>
      <fs-item-group-tree
        [itemGroups]="itemGroups"
        (onItemGroupAdd)="addItemGroup($event)"
        (onItemGroupUpdate)="updateItemGroup($event)"
        (onItemGroupDelete)="deleteItemGroup($event)">
      </fs-item-group-tree>
    </md-card-content>
  </md-card>
  `
})
// tslint:disable-next-line:component-class-suffix
export class ItemGroupContainer implements OnInit, OnDestroy {
  public itemGroups: ItemGroup[] = [];
  public rootItemGroup = { id: 0, parentId: 0, mode: 'Add' };
  private getItemGroupSubscription: Subscription;
  private storeSubscription: Subscription;
  private addItemGroupSubscription: Subscription;
  private updateItemGroupSubscription: Subscription;
  private deleteItemGroupSubscription: Subscription;

  constructor(
    private itemGroupService: ItemGroupService,
    private store: Store,
    private snackBar: MdSnackBar,
    private toastr: ToastService) { }

  public ngOnInit() {
    this.getItemGroupSubscription = this.itemGroupService.getItemGroup()
      .subscribe(null, error => this.onError(error));

    this.storeSubscription = this.store.changes
      .map(store => store.itemGroups)
      .subscribe(itemGroups => this.itemGroups = itemGroups);
  }

  public addItemGroup(itemGroup: ItemGroup): void {
    if (isNil(itemGroup)) { return; };
    this.addItemGroupSubscription = this.itemGroupService.addItemGroup(itemGroup)
      .subscribe(
      () => this.onAddUpdateSuccess(itemGroup.name, 'updated'),
      error => this.onError(error));
  }

  public updateItemGroup(itemGroup: ItemGroup) {
    if (isNil(itemGroup)) { return; };
    this.updateItemGroupSubscription = this.itemGroupService.updateItemGroup(itemGroup)
      .subscribe(
      () => this.onAddUpdateSuccess(itemGroup.name, 'updated'),
      error => this.onError(error));
  }

  public deleteItemGroup(itemGroupId: number) {
    this.deleteItemGroupSubscription = this.itemGroupService.deleteItemGroup(itemGroupId)
      .subscribe(
      () => this.snackBar.open(`Item Group deleted successfully`, 'Close', { duration: 2000 }),
      (error) => this.toastr.error({
        title: 'Unable to delete Item Group',
        text: error.error_description
      }));
  }

  public ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.getItemGroupSubscription.unsubscribe();
    this.addItemGroupSubscription.unsubscribe();
    this.updateItemGroupSubscription.unsubscribe();
    this.deleteItemGroupSubscription.unsubscribe();
  }

  private onAddUpdateSuccess(name: string, operation: string) {
    this.snackBar.open(`${name} ${operation} successfully`, 'Close', { duration: 2000 });
  }

  private onError(error) {
    this.toastr.error({ titleText: error.error_description });
  }
}
