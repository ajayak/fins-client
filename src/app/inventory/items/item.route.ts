import { Routes } from '@angular/router';

import { ItemsContainer } from './items.container';
// import { ItemContainer } from './item';
import { ItemGuard } from './shared';

export const itemRoutes: Routes = [
  {
    path: 'items',
    component: ItemsContainer
  }
  // canActivate: [ItemGuard]
  // {
  //   path: 'item/:id',
  //   component: ItemContainer,
  //   resolve: {
  //     item: ItemResolver,
  //     itemGroups: ItemGroupResolver,
  //     states: StatesResolver
  //   },
  //   canActivate: [ItemGuard]
  // }
];

export const routedComponents = [
  ItemsContainer
  // ItemContainer
];
