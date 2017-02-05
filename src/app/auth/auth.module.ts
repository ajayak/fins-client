import { NgModule } from '@angular/core';

import { AuthRoutingModule, routedComponents } from './auth.route.module';

@NgModule({
  imports: [AuthRoutingModule],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class AuthModule { }
