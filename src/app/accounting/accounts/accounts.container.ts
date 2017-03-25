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
  AccountService,
  AccountPageList
} from './shared';
import { PagingModel } from '../../shared/models';

import { ToastService } from '../../shared/services';

@Component({
  selector: 'fs-account',
  template: `
  <md-card>
    <md-card-title> Account Listing </md-card-title>
    <md-card-subtitle> Manage Accounts </md-card-subtitle>
    <md-divider></md-divider>
    <md-card-content>
      <a md-raised-button
        color='primary'
        [routerLink]="['','account', '0']">Add Account</a>
      <fs-account-list
        [accountList]="accountList"
        (onChange)="onPagingAction($event)"
        (onAccountDelete)="deleteAccount($event)">
      </fs-account-list>
    </md-card-content>
  </md-card>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountsContainer implements OnInit, OnDestroy {
  public accountList: AccountPageList = new AccountPageList();
  private accountSubscription: Subscription;
  private deleteAccountSubscription: Subscription;
  private page = new PagingModel();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBar: MdSnackBar,
    private toastr: ToastService) { }

  public onPagingAction(page: PagingModel) {
    this.page = page;
    this.initializeAccounts();
  }

  public deleteAccount(accountId: number) {
    this.deleteAccountSubscription = this.accountService.deleteAccount(accountId)
      .subscribe(
      () => this.onDeleteSuccess(),
      error => this.onDeleteError(error));
  }

  public ngOnInit() {
    this.initializeAccounts();
  }

  public ngOnDestroy() {
    this.accountSubscription.unsubscribe();
    this.deleteAccountSubscription.unsubscribe();
  }

  private initializeAccounts() {
    this.accountSubscription = this.accountService
      .getAllAccounts(this.page.pageNo, this.page.pageSize, this.page.sort)
      .subscribe(accountList => this.accountList = accountList);
  }

  private onDeleteSuccess() {
    this.snackBar.open(`Account deleted successfully`, 'Close', { duration: 2000 });
    this.initializeAccounts();
  }

  private onDeleteError(error) {
    this.toastr.error({
      title: 'Unable to delete Account',
      text: error.error_description
    });
  }
}
