import { AuthTokenModel } from '../../auth/auth-token.model';

export interface State {
  showSpinner: boolean;
  openSideNav: boolean;
  auth?: AuthTokenModel;
}

export const defaultState: State = {
  showSpinner: false,
  openSideNav: true,
  auth: null
};

/*
 Replicate state structure in here
 for easy state updates
*/
export const StateHelper = {
  showSpinner: 'showSpinner',
  openSideNav: 'openSideNav',
  auth: 'auth'
};
