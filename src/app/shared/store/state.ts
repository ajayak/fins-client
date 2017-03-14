import { AuthTokenModel } from '../../auth/shared';
import { AccountGroup } from '../../accounting/accountGroup';

export interface State {
  showSpinner: boolean;
  openSideNav: boolean;
  auth: AuthTokenModel;
  accountGroups: AccountGroup[];
}

export const defaultState: State = {
  showSpinner: false,
  openSideNav: true,
  auth: null,
  accountGroups: null
};

/*
 Replicate state structure in here
 for easy state updates
*/
export const StateHelper = {
  showSpinner: 'showSpinner',
  openSideNav: 'openSideNav',
  auth: 'auth',
  accountGroups: 'accountGroups'
};
