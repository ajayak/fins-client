import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { AuthGuard } from '../auth';
import { HomeContainer } from './home.container';
import { NavbarComponent } from './navbar';
import { SidebarComponent } from './sidebar';

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
  NavbarComponent,
  SidebarComponent
];
