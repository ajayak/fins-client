import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';
import isNil from 'lodash/isNil';

import { UserProfileService } from '../../auth';
import { Store } from '../../shared/store';
import { ToastService } from '../../shared/services';
import { AccountGroupService } from './shared';
import { AccountGroupModel } from './shared';

@Component({
  selector: 'fs-account-group',
  template: `
    <fs-add-account-group 
      [parent]="rootAccountGroup"
      (onRootAccountGroupAdd)="addAccountGroup($event)">
    </fs-add-account-group>
    <fs-account-group-tree
      [accountGroups]="accountGroups"
      (onAccountGroupAdd)="addAccountGroup($event)"
      (onAccountGroupUpdate)="updateAccountGroup($event)"
      (onAccountGroupDelete)="deleteAccountGroup($event)">
    </fs-account-group-tree>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountGroupContainer implements OnInit, OnDestroy {
  public accountGroups: AccountGroupModel[] = [];
  public rootAccountGroup = { id: 0, parentId: 0, mode: 'Add' };
  private getAccountGroupSubscription: Subscription;
  private storeSubscription: Subscription;

  constructor(
    private accountGroupService: AccountGroupService,
    private store: Store,
    private snackBar: MdSnackBar,
    private userProfile: UserProfileService,
    private toastr: ToastService) { }

  public ngOnInit() {
    this.getAccountGroupSubscription = this.accountGroupService.getAccountGroup()
      .subscribe(null, error => this.onError(error));

    this.storeSubscription = this.store.changes
      .map(store => store.accountGroups)
      .subscribe(accountGroups => this.accountGroups = accountGroups);
  }

  public addAccountGroup(accountGroup: AccountGroupModel): void {
    if (isNil(accountGroup)) { return; };
    this.accountGroupService.addAccountGroup(accountGroup)
      .subscribe(
      () => this.onAddUpdateSuccess(accountGroup.name, 'updated'),
      error => this.onError(error));
  }

  public updateAccountGroup(accountGroup: AccountGroupModel) {
    if (isNil(accountGroup)) { return; };
    this.accountGroupService.updateAccountGroup(accountGroup)
      .subscribe(
      () => this.onAddUpdateSuccess(accountGroup.name, 'updated'),
      error => this.onError(error));
  }

  public deleteAccountGroup(accountGroupId: number) {
    const orgId = this.userProfile.getOrgId();
    this.accountGroupService.deleteAccountGroup(orgId, accountGroupId)
      .subscribe(
      () => this.snackBar.open(`Account Group deleted successfully`, 'Close', { duration: 2000 }),
      (error) => this.toastr.error({
        title: 'Unable to delete Account Group',
        text: error.error_description
      }));
  }

  public ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.getAccountGroupSubscription.unsubscribe();
  }

  private onAddUpdateSuccess(name: string, operation: string) {
    this.snackBar.open(`${name} ${operation} successfully`, 'Close', { duration: 2000 });
  }

  private onError(error) {
    this.toastr.error({ titleText: error.error_description });
  }
}
