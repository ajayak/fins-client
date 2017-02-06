export interface State {
  showSpinner: boolean;
}

export const defaultState: State = {
  showSpinner: true
};

/*
 Replicate state structure in here
 for easy state updates
*/
export const StateHelper = {
  showSpinner: 'showSpinner'
};
