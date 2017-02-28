import { accountGroupRoutes } from './accountGroup';
import { accountRoutes } from './account';

export const accountingRoutes = [
  ...accountGroupRoutes,
  ...accountRoutes
];
