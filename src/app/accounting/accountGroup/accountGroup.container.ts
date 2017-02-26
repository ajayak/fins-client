import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';
import isNil from 'lodash/isNil';

import { Store } from '../../shared/store';
import { AccountGroupService } from './accountGroup.service';
import { AccountGroupModel } from './accountGroup.model';

@Component({
  selector: 'fs-account-group',
  template: `
    <fs-add-account-group 
      [parent]="{id: 0, parentId: 0}"
      (onRootAccountGroupAdd)="addAccountGroup($event)">
    </fs-add-account-group>
    <fs-account-group-tree
      [accountGroups]="accountGroups"
      (onAccountGroupAdd)="addAccountGroup($event)"
      (onAccountGroupUpdate)="updateAccountGroup($event)">
    </fs-account-group-tree>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountGroupContainer implements OnInit, OnDestroy {
  public accountGroups: AccountGroupModel[] = [];
  private getAccountGroupSubscription: Subscription;
  private storeSubscription: Subscription;

  constructor(
    private accountGroupService: AccountGroupService,
    private store: Store,
    private snackBar: MdSnackBar) { }

  public ngOnInit() {
    this.getAccountGroupSubscription = this.accountGroupService.getAccountGroup().subscribe();

    this.storeSubscription = this.store.changes
      .map(store => store.accountGroups)
      .subscribe(accountGroups => this.accountGroups = accountGroups);
  }

  public addAccountGroup(accountGroup: AccountGroupModel): void {
    if (isNil(accountGroup)) { return; };
    this.accountGroupService.addAccountGroup(accountGroup)
      .subscribe(() => {
        this.snackBar.open(`${accountGroup.name} added successfully`, 'Close', { duration: 2000 });
      });
  }

  public updateAccountGroup(accountGroup: AccountGroupModel) {
    console.log('Updated');
  }

  public ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.getAccountGroupSubscription.unsubscribe();
  }
}
