import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepMode } from '@covalent/core/steps/steps.module';
import { TdMediaService } from '@covalent/core/media/media.module';
import { Subscription } from 'rxjs/Subscription';

import { Account } from '../shared';
import { AccountGroupService } from '../../accountGroup';
import { UserProfileService } from '../../../auth';

@Component({
  selector: 'fs-account',
  template: `
    <fs-account-form
      [account]="account"
      [accountGroups]="accountGroupDictionary"
      [orientation]="stepperOrientation"
      (onAccountAdd)="onAccountAdd($event)"
      (onAccountUpdate)="onAccountUpdate($event)"
    ></fs-account-form>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountContainer implements OnInit, OnDestroy {
  public account: Account;
  public accountGroupDictionary: Array<{}> = [];
  public querySubscription: Subscription;
  public stepperOrientation = StepMode.Horizontal;

  constructor(
    private route: ActivatedRoute,
    private accountGroupService: AccountGroupService,
    private profile: UserProfileService,
    private mediaService: TdMediaService) { }

  public ngOnInit(): void {
    this.watchScreen();
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

  public onAccountAdd($event) {
    console.log($event);
  }

  public onAccountUpdate($event) {
    console.log($event);
  }

  public watchScreen(): void {
    this.querySubscription = this.mediaService.registerQuery('sm')
      .subscribe((isSmallScreen: boolean) => {
        this.stepperOrientation = isSmallScreen ? StepMode.Vertical : StepMode.Horizontal;
        console.log(this.stepperOrientation);
      });
  }

  public ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
