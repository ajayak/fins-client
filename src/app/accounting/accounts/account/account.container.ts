import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import {
  Account,
  AccountService
} from '../shared';
import { States } from '../../../states/shared';
import { ToastService } from '../../../shared/services';


@Component({
  selector: 'fs-account',
  template: `
    <fs-account-form
      [account]="account"
      [accountGroups]="accountGroupDictionary"
      [states]="states"
      (onAccountAdd)="onAccountAdd($event)"
      (onAccountUpdate)="onAccountUpdate($event)"
    ></fs-account-form>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountContainer implements OnInit {
  public account: Account;
  public accountGroupDictionary: Array<{}> = [];
  public states: States[] = [];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastr: ToastService,
    private snackBar: MdSnackBar) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.account = data.account;
      this.accountGroupDictionary = data.accountGroups;
      this.states = data.states;
    });
  }

  public onAccountAdd(account: Account) {
    this.accountService.addAccount(account)
      .subscribe(
      (result: Account) => this.onSuccess(result, 'Added'),
      (error) => this.onError(error));
  }

  public onAccountUpdate(account: Account) {
    this.accountService.updateAccount(account)
      .subscribe(
      (result: Account) => this.onSuccess(result, 'Updated'),
      (error) => this.onError(error));
  }

  private onSuccess(account: Account, mode: string) {
    this.account = account;
    this.snackBar.open(`Account ${mode} successfully`, 'Close', { duration: 2000 });
  }

  private onError(error) {
    this.toastr.error({ title: 'Failed to save account', text: 'Please try again later' });
  }
}
