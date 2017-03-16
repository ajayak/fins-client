import { Routes } from '@angular/router';

import { ItemGroupContainer } from './itemGroup.container';
import { ItemGroupGuard } from './shared';

export const itemGroupRoutes: Routes = [
  {
    path: 'item-group',
    component: ItemGroupContainer,
    canActivate: [ItemGroupGuard]
  }
];

export const routedComponents = [
  ItemGroupContainer
];
