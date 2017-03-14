import { NgModule } from '@angular/core';

import { AccountGroupModule } from './accountGroup';
import { AccountModule } from './accounts';

@NgModule({
  imports: [
    AccountGroupModule,
    AccountModule
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class AccountingModule { }
