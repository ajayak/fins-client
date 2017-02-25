import { Routes } from '@angular/router';

import { AccountGroupContainer } from './accountGroup.container';
import { AccountGroupTreeComponent } from './accountGroupTree';
import { AddAccountGroupComponent } from './addAccountGroup.component';
import { AccountGroupCreatorDialogComponent } from './accountGroupCreator';

export const accountGroupRoutes: Routes = [
  { path: 'account-group', component: AccountGroupContainer }
];

export const routedComponents = [
  AccountGroupContainer,
  AccountGroupTreeComponent,
  AddAccountGroupComponent,
  AccountGroupCreatorDialogComponent
];

export const entryComponents = [
  AccountGroupCreatorDialogComponent
];
