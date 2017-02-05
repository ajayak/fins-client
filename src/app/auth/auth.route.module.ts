import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthContainer } from './auth.container';

const routes: Routes = [
  { path: 'auth', component: AuthContainer },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }

export const routedComponents = [AuthContainer];
