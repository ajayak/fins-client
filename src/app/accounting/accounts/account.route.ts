import { Routes } from '@angular/router';

import { AccountsContainer } from './accounts.container';
import { AccountContainer } from './account';
import { AccountListComponent } from './account-list';
import { AccountResolver } from './shared';

export const accountRoutes: Routes = [
  { path: 'accounts', component: AccountsContainer },
  {
    path: 'account/:id',
    component: AccountContainer,
    resolve: {
      account: AccountResolver
    }
  }
];

export const routedComponents = [
  AccountsContainer,
  AccountContainer,
  AccountListComponent
];
