import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
}

const defaultState: State = {
};

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private store = _store;

  // tslint:disable-next-line:member-ordering
  public changes = this.store
    .asObservable()
    .distinctUntilChanged();

  public setState(state: State) {
    this.store.next(state);
  }

  public getState(): State {
    return this.store.value;
  }

  public purge() {
    this.store.next(defaultState);
  }
}
