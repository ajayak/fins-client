import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { isNil } from 'lodash';

import {
  ItemService,
  ItemPageList
} from './shared';
import { PagingModel } from '../../shared/models';
import { ToastService } from '../../shared/services';

@Component({
  selector: 'fs-item',
  template: `
  <md-card>
    <md-card-title> Item Listing </md-card-title>
    <md-card-subtitle> Manage Items </md-card-subtitle>
    <md-divider></md-divider>
    <md-card-content>
      <a md-raised-button
        color='primary'
        [routerLink]="['','item', '0']">Add Item</a>
      <fs-item-list
        [itemList]="itemList"
        (onChange)="onPagingAction($event)"
        (onItemDelete)="deleteItem($event)">
      </fs-item-list>
    </md-card-content>
  </md-card>
  `
})
// tslint:disable-next-line:component-class-suffix
export class ItemsContainer implements OnInit, OnDestroy {
  public itemList: ItemPageList = new ItemPageList();
  private subscription: Subscription;
  private page = new PagingModel();

  constructor(
    private itemService: ItemService,
    private router: Router,
    private snackBar: MdSnackBar,
    private toastr: ToastService) { }

  public onPagingAction(page: PagingModel) {
    this.page = page;
    this.initializeItems();
  }

  public deleteItem(itemId: number) {
    this.itemService.deleteItem(itemId)
      .subscribe(
      () => this.onDeleteSuccess(),
      error => this.onDeleteError(error));
  }

  public ngOnInit() {
    this.initializeItems();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeItems() {
    this.subscription = this.itemService
      .getAllItems(this.page.pageNo, this.page.pageSize, this.page.sort)
      .subscribe(itemList => this.itemList = itemList);
  }

  private onDeleteSuccess() {
    this.snackBar.open(`Item deleted successfully`, 'Close', { duration: 2000 });
    this.initializeItems();
  }

  private onDeleteError(error) {
    this.toastr.error({
      title: 'Unable to delete Item',
      text: error.error_description
    });
  }
}
