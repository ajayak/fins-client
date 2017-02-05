import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AuthRoutingModule, routedComponents } from './auth.route.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class AuthModule { }
