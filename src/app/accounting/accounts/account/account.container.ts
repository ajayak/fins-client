import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  Account,
  AccountService
} from '../shared';
import { AccountGroupService } from '../../accountGroup';
import { UserProfileService } from '../../../auth';

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
    private accountGroupService: AccountGroupService,
    private accountService: AccountService,
    private profile: UserProfileService) { }

  public ngOnInit(): void {
    this.route.data.subscribe((data: { account: Account }) => {
      this.account = data.account;
    });
    const orgId = this.profile.getOrgId();
    this.accountGroupService.getAccountGroupDictionary(orgId)
      .subscribe(dict => this.accountGroupDictionary = this.mapObjectToArray(dict));
  }

  public mapObjectToArray(obj): Array<{}> {
    return Object.keys(obj)
      .map(id => ({ id, value: obj[id] }));
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
