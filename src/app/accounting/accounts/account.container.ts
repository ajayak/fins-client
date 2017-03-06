import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import isNil from 'lodash/isNil';

import {
  AccountService,
  AccountDtoPageList
} from './shared';
import { PagingModel } from '../../shared/models';

@Component({
  selector: 'fs-account',
  template: `
    <fs-account-list
      [accountList]="accountList"
      (onChange)="onPagingAction($event)"
    >
    </fs-account-list>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountContainer implements OnInit, OnDestroy {
  public accountList: AccountDtoPageList = new AccountDtoPageList();
  private subscription: Subscription;

  constructor(private AccountService: AccountService) { }

  public onPagingAction(page: PagingModel) {
    this.initializeAccounts(page);
  }

  public ngOnInit() {
    this.initializeAccounts();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeAccounts(page?: PagingModel) {
    if (isNil(page)) {
      page = new PagingModel();
    }
    this.subscription = this.AccountService
      .getAllAccounts(page.pageNo, page.pageSize, page.sort)
      .subscribe(accountList => this.accountList = accountList);
  }
}
