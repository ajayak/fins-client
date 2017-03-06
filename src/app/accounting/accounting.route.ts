import { accountGroupRoutes } from './accountGroup';
import { accountRoutes } from './accounts';

export const accountingRoutes = [
  ...accountGroupRoutes,
  ...accountRoutes
];
