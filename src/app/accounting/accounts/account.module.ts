import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { StatesModule } from '../../states';
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
  AccountGroupResolver,
  StatesResolver
} from './shared';

@NgModule({
  imports: [
    SharedModule,
    StatesModule
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
    AccountGroupResolver,
    StatesResolver
  ]
})
export class AccountModule { }
