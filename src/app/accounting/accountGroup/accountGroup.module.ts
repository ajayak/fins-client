import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { routedComponents } from './accountGroup.route';
import { AccountGroupService } from './accountGroup.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [AccountGroupService],
})
export class AccountGroupModule { }
