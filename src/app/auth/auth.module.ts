import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import {
  AuthRoutingModule,
  routedComponents
} from './auth.route.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [
    AuthService,
    AuthGuard
  ],
})
export class AuthModule { }
