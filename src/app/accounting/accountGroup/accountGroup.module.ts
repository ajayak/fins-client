import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import {
  AccountGroupService,
  AccountGroupGuard
} from './shared';
import {
  routedComponents,
  entryComponents
} from './accountGroup.route';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [
    AccountGroupService,
    AccountGroupGuard
  ],
  entryComponents: [entryComponents]
})
export class AccountGroupModule { }
