export interface State {
  showSpinner: boolean;
  auth: any;
}

export const defaultState: State = {
  showSpinner: false,
  auth: {}
};

/*
 Replicate state structure in here
 for easy state updates
*/
export const StateHelper = {
  showSpinner: 'showSpinner',
  auth: 'auth'
};
