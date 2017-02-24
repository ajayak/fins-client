import {
  Component,
  OnInit
} from '@angular/core';

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
export class AccountGroupContainer implements OnInit {
  public accountGroups: AccountGroupModel[];

  constructor(
    private accountGroupService: AccountGroupService,
    private store: Store) { }

  public ngOnInit() {
    this.accountGroupService.getAccountGroup().subscribe();

    this.store.changes
      .map(c => c.accountGroups)
      .subscribe(accountGroups => this.accountGroups = accountGroups);
  }
}
