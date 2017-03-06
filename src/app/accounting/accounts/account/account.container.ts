import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Account } from '../shared';

@Component({
  selector: 'fs-account',
  template: `
    <fs-account-form
      [account]="account"
      (onAccountAdd)="onAccountAdd($event)"
      (onAccountUpdate)="onAccountUpdate($event)"
    ></fs-account-form>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountContainer implements OnInit {
  public account: Account;
  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.data.subscribe((data: { account: Account }) => {
      this.account = data.account;
    });
  }

  public onAccountAdd($event) {
    console.log($event);
  }

  public onAccountUpdate($event) {
    console.log($event);
  }
}
