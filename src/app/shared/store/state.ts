export interface State {
  showSpinner: boolean;
  openSideNav: boolean;
  auth: any;
}

export const defaultState: State = {
  showSpinner: false,
  openSideNav: true,
  auth: {}
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
