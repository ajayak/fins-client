import { NgModule } from '@angular/core';

import {
  HomeRoutingModule,
  routedComponents
} from './home.route.module';
import { SharedModule } from '../shared';
import { SideNavService } from './sidenav';
import {
  ThemeService,
  ThemeSelectorComponent
} from './theme-selector';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    routedComponents,
    ThemeSelectorComponent
  ],
  providers: [
    SideNavService,
    ThemeService
  ],
})
export class HomeModule { }
