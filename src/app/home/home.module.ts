import { NgModule } from '@angular/core';

import {
  HomeRoutingModule,
  routedComponents
} from './home.route.module';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class HomeModule { }
