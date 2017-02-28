import { Routes } from '@angular/router';

import { AccountContainer } from './account.container';
import { AccountListComponent } from './account-list';

export const accountRoutes: Routes = [
  { path: 'account', component: AccountContainer }
];

export const routedComponents = [
  AccountContainer,
  AccountListComponent
];
