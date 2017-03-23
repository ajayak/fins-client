import { itemGroupRoutes } from './itemGroup';
import { itemRoutes } from './items';

export const inventoryRoutes = [
  ...itemGroupRoutes,
  ...itemRoutes
];
