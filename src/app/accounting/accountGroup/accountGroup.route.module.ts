import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { AccountGroupContainer } from './accountGroup.container';
import { AccountGroupTreeComponent } from './accountGroupTree';

const routes: Routes = [
  { path: 'accountGroup', component: AccountGroupContainer },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountGroupRoutingModule { }

export const routedComponents = [
  AccountGroupContainer,
  AccountGroupTreeComponent
];
