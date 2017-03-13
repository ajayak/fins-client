import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  Account,
  AccountService
} from '../shared';
// import { StatesService } from '../../../states/shared';

@Component({
  selector: 'fs-account',
  template: `
    <fs-account-form
      [account]="account"
      [accountGroups]="accountGroupDictionary"
      (onAccountAdd)="onAccountAdd($event)"
      (onAccountUpdate)="onAccountUpdate($event)"
    ></fs-account-form>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountContainer implements OnInit {
  public account: Account;
  public accountGroupDictionary: Array<{}> = [];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.account = data.account;
      this.accountGroupDictionary = data.accountGroups;
    });
  }

  public onAccountAdd(account: Account) {
    console.log(account);
    this.accountService.addAccount(account)
      .subscribe(this.onSuccess, this.onError);
  }

  public onAccountUpdate(account: Account) {
    console.log(account);
  }

  private onSuccess(result) {
    console.log(result);
  }

  private onError(error) {
    console.log(error);
  }
}
