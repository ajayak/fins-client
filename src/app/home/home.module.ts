import { NgModule } from '@angular/core';

import {
  HomeRoutingModule,
  routedComponents
} from './home.route.module';
import { SharedModule } from '../shared';
import { SideNavService } from './sidenav';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [SideNavService],
})
export class HomeModule { }
