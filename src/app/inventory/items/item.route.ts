import { Routes } from '@angular/router';

import { ItemGroupResolver } from '../itemGroup/shared';
import { UnitResolver } from '../../common/unit/shared';
import { ItemsContainer } from './items.container';
import { ItemContainer } from './item';
import {
  ItemGuard,
  ItemResolver
} from './shared';

export const itemRoutes: Routes = [
  {
    path: 'items',
    component: ItemsContainer,
    canActivate: [ItemGuard]
  },
  {
    path: 'item/:id',
    component: ItemContainer,
    resolve: {
      item: ItemResolver,
      itemGroups: ItemGroupResolver,
      units: UnitResolver
    },
    canActivate: [ItemGuard]
  }
];

export const routedComponents = [
  ItemsContainer,
  ItemContainer
];
