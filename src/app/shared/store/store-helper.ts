import { Injectable } from '@angular/core';
import { Store } from './store';

@Injectable()
export class StoreHelper {
    constructor(private store: Store) { }

    public update(prop, state) {
        const currentState = this.store.getState();
        this.store.setState(Object.assign({}, currentState, { [prop]: state }));
    }

    public add(prop, state) {
        const currentState = this.store.getState();
        const collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
    }

    public findAndUpdate(prop, state) {
        const currentState = this.store.getState();
        const collection = currentState[prop];
        this.store.setState(Object.assign({}, currentState, {
            [prop]: collection.map((item) => {
                if (item.id !== state.id) {
                    return item;
                }
                return Object.assign({}, item, state);
            })
        }));
    }

    public findAndAddInArray(prop, state) {
        const currentState = this.store.getState();
        const newState = {
            ...currentState,
            [prop]: [
                ...currentState[prop],
                state
            ]
        };
        this.store.setState(newState);
    }

    public findAndDelete(prop, id) {
        const currentState = this.store.getState();
        const collection = currentState[prop];
        const newState = {
            ...currentState,
            [prop]: collection.filter((item) => item.id !== id)
        };
        this.store.setState(newState);
    }
}
