import { accountingRoutes } from './accounting';
import { inventoryRoutes } from './inventory';

export const AppChildRoutes = [
  ...accountingRoutes,
  ...inventoryRoutes
];
