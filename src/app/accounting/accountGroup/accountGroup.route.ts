import { Routes } from '@angular/router';

import { AccountGroupContainer } from './accountGroup.container';
import { AccountGroupTreeComponent } from './accountGroup-tree';
import { AddAccountGroupComponent } from './addAccountGroup.component';
import { AccountGroupCreatorDialogComponent } from './accountGroupCreator';
import { AccountGroupGuard } from './accountGroup.guard';

export const accountGroupRoutes: Routes = [
  { path: 'account-group', component: AccountGroupContainer, canActivate: [AccountGroupGuard] }
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
