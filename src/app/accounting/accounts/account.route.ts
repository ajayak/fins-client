import { Routes } from '@angular/router';

import { AccountsContainer } from './accounts.container';
import { AccountContainer } from './account';
import {
  AccountResolver,
  AccountGroupResolver,
  StatesResolver,
  AccountGuard
} from './shared';

export const accountRoutes: Routes = [
  {
    path: 'accounts',
    component: AccountsContainer,
    canActivate: [AccountGuard]
  },
  {
    path: 'account/:id',
    component: AccountContainer,
    resolve: {
      account: AccountResolver,
      accountGroups: AccountGroupResolver,
      states: StatesResolver
    },
    canActivate: [AccountGuard]
  }
];

export const routedComponents = [
  AccountsContainer,
  AccountContainer
];
