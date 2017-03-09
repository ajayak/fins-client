import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { routedComponents } from './account.route';
import { AccountListComponent } from './account-list';
import { AccountComponent } from './account';
import { PersonComponent } from './account/person';

import {
  AccountService,
  AccountResolver
} from './shared';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [
    routedComponents,
    AccountComponent,
    PersonComponent,
    AccountListComponent
  ],
  providers: [
    AccountService,
    AccountResolver
  ],
})
export class AccountModule { }
