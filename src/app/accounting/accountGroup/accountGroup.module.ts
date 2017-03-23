import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import {
  AccountGroupService,
  AccountGroupGuard,
  AccountGroupResolver
} from './shared';
import { routedComponents } from './accountGroup.route';
import { AccountGroupTreeComponent } from './accountGroup-tree';
import { AddAccountGroupComponent } from './accountGroup-adder';
import { AccountGroupCreatorDialogComponent } from './accountGroup-creator';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  declarations: [
    routedComponents,
    AccountGroupTreeComponent,
    AddAccountGroupComponent,
    AccountGroupCreatorDialogComponent
  ],
  providers: [
    AccountGroupService,
    AccountGroupGuard,
    AccountGroupResolver
  ],
  entryComponents: [AccountGroupCreatorDialogComponent]
})
export class AccountGroupModule { }
