import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import isNull from 'lodash/isNull';

import {
  defaultState,
  State
} from './state';
import { config } from '../../core';

const localStorageState = window.localStorage.getItem(config.appKeys.storeKey);
const localState = <State>JSON.parse(localStorageState);
let _store;
if (isNull(localState) || isNull(localState.auth)) {
  _store = new BehaviorSubject<State>(defaultState);
} else {
  _store = new BehaviorSubject<State>(localState);
}

@Injectable()
export class Store {
  private store = _store;

  // tslint:disable-next-line:member-ordering
  public changes = this.store
    .asObservable()
    .distinctUntilChanged();

  public setState(state: State) {
    this.store.next(state);
    window.localStorage.setItem(config.appKeys.storeKey, JSON.stringify(state));
  }

  public getState(): State {
    return this.store.value;
  }

  public purge() {
    window.localStorage.removeItem(config.appKeys.storeKey);
    this.store.next(defaultState);
  }
}
