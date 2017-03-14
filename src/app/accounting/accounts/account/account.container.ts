import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  Account,
  AccountService
} from '../shared';
import { States } from '../../../states/shared';

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
    private accountService: AccountService) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.account = data.account;
      this.accountGroupDictionary = data.accountGroups;
      this.states = data.states;
    });
  }

  public onAccountAdd(account: Account) {
    console.log(account);
    this.accountService.addAccount(account)
      .subscribe(this.onSuccess, this.onError);
  }

  public onAccountUpdate(account: Account) {
    this.account = account;
    console.log(account);
  }

  private onSuccess(result) {
    console.log(result);
  }

  private onError(error) {
    console.log(error);
  }
}
