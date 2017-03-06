import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import isNil from 'lodash/isNil';

import {
  AccountService,
  AccountPageList
} from './shared';
import { PagingModel } from '../../shared/models';

@Component({
  selector: 'fs-account',
  template: `
    <a md-raised-button
      color='primary'
      [routerLink]="['','account', '0']">Add Account</a>
    <fs-account-list
      [accountList]="accountList"
      (onChange)="onPagingAction($event)">
    </fs-account-list>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountsContainer implements OnInit, OnDestroy {
  public accountList: AccountPageList = new AccountPageList();
  private subscription: Subscription;

  constructor(
    private AccountService: AccountService,
    private router: Router) { }

  public onPagingAction(page: PagingModel) {
    this.initializeAccounts(page);
  }

  public ngOnInit() {
    this.initializeAccounts();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public addAccount() {
    this.router.navigate(['', 'account', '0']);
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
