import { Routes } from '@angular/router';

import { AccountsContainer } from './accounts.container';
import { AccountContainer } from './account';
import {
  AccountResolver,
  AccountGroupResolver,
  StatesResolver
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
      accountGroups: AccountGroupResolver,
      states: StatesResolver
    }
  }
];

export const routedComponents = [
  AccountsContainer,
  AccountContainer
];
