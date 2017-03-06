import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import {
  AuthRoutingModule,
  routedComponents
} from './auth.route.module';
import {
  AuthService,
  UserProfileService,
  AuthGuard
} from './shared';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [
    AuthService,
    UserProfileService,
    AuthGuard
  ],
})
export class AuthModule { }
