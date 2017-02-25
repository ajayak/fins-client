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
    <fs-account-group-tree [accountGroups]="accountGroups"></fs-account-group-tree>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountGroupContainer implements OnInit, OnDestroy {
  public accountGroups: AccountGroupModel[] = [];
  private subscription: Subscription;

  constructor(
    private accountGroupService: AccountGroupService,
    private store: Store) { }

  public ngOnInit() {
    this.subscription = this.accountGroupService.getAccountGroup().subscribe();

    this.store.changes
      .map(c => c.accountGroups)
      .subscribe(accountGroups => this.accountGroups = accountGroups);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
