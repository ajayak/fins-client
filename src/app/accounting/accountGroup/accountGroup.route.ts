import { Routes } from '@angular/router';

import { AccountGroupContainer } from './accountGroup.container';
import { AccountGroupGuard } from './shared';

export const accountGroupRoutes: Routes = [
  {
    path: 'account-group',
    component: AccountGroupContainer,
    canActivate: [AccountGroupGuard]
  }
];

export const routedComponents = [
  AccountGroupContainer,
];
