import { AuthTokenModel } from '../../auth/shared';
import { AccountGroup } from '../../accounting/accountGroup/shared';
import { ItemGroup } from '../../inventory/itemGroup/shared';

export interface State {
  showSpinner: boolean;
  openSideNav: boolean;
  selectedTheme: string;
  auth: AuthTokenModel;
  accountGroups: AccountGroup[];
  itemGroups: ItemGroup[];
}

export const defaultState: State = {
  showSpinner: false,
  openSideNav: true,
  selectedTheme: 'light',
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
  selectedTheme: 'selectedTheme',
  auth: 'auth',
  accountGroups: 'accountGroups',
  itemGroups: 'itemGroups'
};
