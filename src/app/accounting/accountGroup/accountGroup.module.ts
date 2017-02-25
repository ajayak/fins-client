import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { AccountGroupService } from './accountGroup.service';
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
  providers: [AccountGroupService],
  entryComponents: [entryComponents]
})
export class AccountGroupModule { }
