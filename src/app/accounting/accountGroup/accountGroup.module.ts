import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import {
  AccountGroupRoutingModule,
  routedComponents
} from './accountGroup.route.module';
import { AccountGroupService } from './accountGroup.service';

@NgModule({
  imports: [
    SharedModule,
    AccountGroupRoutingModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [AccountGroupService],
})
export class AccountGroupModule { }
