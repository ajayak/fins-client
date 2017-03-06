import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { routedComponents } from './account.route';
import { AccountService } from './account.service';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [routedComponents],
  providers: [AccountService],
})
export class AccountModule { }
