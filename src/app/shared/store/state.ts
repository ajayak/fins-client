import { AuthTokenModel } from '../../auth/shared';
import { AccountGroup } from '../../accounting/accountGroup/shared';
import { ItemGroup } from '../../inventory/itemGroup/shared';

export interface State {
  showSpinner: boolean;
  openSideNav: boolean;
  auth: AuthTokenModel;
  accountGroups: AccountGroup[];
  itemGroups: ItemGroup[];
}

export const defaultState: State = {
  showSpinner: false,
  openSideNav: true,
  auth: null,
  accountGroups: null,
  itemGroups: null
};

/*
 Replicate state structure in here
 for easy state updates
*/
export const StateHelper = {
  showSpinner: 'showSpinner',
  openSideNav: 'openSideNav',
  auth: 'auth',
  accountGroups: 'accountGroups',
  itemGroups: 'itemGroups'
};
