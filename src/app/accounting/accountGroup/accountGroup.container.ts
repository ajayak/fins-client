import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../../shared/store';
import { AccountGroupService } from './accountGroup.service';
import { AccountGroupModel } from './accountGroup.model';

@Component({
  selector: 'fs-account-group',
  template: `
    <fs-add-account-group 
      [parent]="{parentId: 0}"
      (onRootAccountGroupAdd)="addRootAccountGroup($event)">
    </fs-add-account-group>
    <fs-account-group-tree 
      [accountGroups]="accountGroups">
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
    private store: Store) { }

  public ngOnInit() {
    this.getAccountGroupSubscription = this.accountGroupService.getAccountGroup().subscribe();

    this.storeSubscription = this.store.changes
      .map(store => store.accountGroups)
      .subscribe(accountGroups => this.accountGroups = accountGroups);
  }

  public addRootAccountGroup(accountGroup: AccountGroupModel) {
    console.log('Added', accountGroup);
  }

  public ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.getAccountGroupSubscription.unsubscribe();
  }
}
