import { NgModule } from '@angular/core';
import {
  Route,
  Routes,
  RouterModule
} from '@angular/router';

import { AuthGuard } from '../auth';
import { HomeContainer } from './home.container';
import { NavbarContainer } from './navbar';
import { SideNavComponent } from './sidenav';

import { AppChildRoutes } from '../app.route.helper';

const primaryRoute: Route = {
  component: HomeContainer,
  canActivate: [AuthGuard],
  children: AppChildRoutes
};

const routes: Routes = [
  { path: '', ...primaryRoute },
  { path: 'home', ...primaryRoute },
  { path: 'app', ...primaryRoute }
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
