import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { routedComponents } from './account.route';
import { AccountListComponent } from './account-list';
import { AccountComponent } from './account';
import {
  PersonComponent,
  PersonSummaryComponent
} from './account/person';

import {
  AccountService,
  AccountResolver,
  AccountGuard
} from './shared';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  declarations: [
    routedComponents,
    AccountComponent,
    AccountListComponent,
    PersonComponent,
    PersonSummaryComponent
  ],
  providers: [
    AccountService,
    AccountResolver,
    AccountGuard
  ]
})
export class AccountModule { }
