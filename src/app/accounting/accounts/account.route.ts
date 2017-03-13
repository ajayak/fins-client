import { Routes } from '@angular/router';

import { AccountsContainer } from './accounts.container';
import { AccountContainer } from './account';
import {
  AccountResolver,
  AccountGroupResolver
} from './shared';

export const accountRoutes: Routes = [
  {
    path: 'accounts',
    component: AccountsContainer
  },
  {
    path: 'account/:id',
    component: AccountContainer,
    resolve: {
      account: AccountResolver,
      accountGroups: AccountGroupResolver
    }
  }
];

export const routedComponents = [
  AccountsContainer,
  AccountContainer
];
