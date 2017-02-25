import { Routes } from '@angular/router';

import { AccountGroupContainer } from './accountGroup.container';
import { AccountGroupTreeComponent } from './accountGroupTree';

export const accountGroupRoutes: Routes = [
  { path: 'account-group', component: AccountGroupContainer }
];

export const routedComponents = [
  AccountGroupContainer,
  AccountGroupTreeComponent
];
