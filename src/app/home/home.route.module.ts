import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { AuthGuard } from '../auth';
import { HomeContainer } from './home.container';
import { NavbarContainer } from './navbar';
import { SideNavComponent } from './sidenav';

const routes: Routes = [
  {
    path: '',
    component: HomeContainer,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeContainer,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

export const routedComponents = [
  HomeContainer,
  NavbarContainer,
  SideNavComponent
];
