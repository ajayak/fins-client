import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import { Observable } from 'rxjs';

import { isProduction } from '../environment';

const debuggerOn = !isProduction;

Observable.prototype.debug = (message: string) => {
  return this.do(
    (nextValue) => {
      if (debuggerOn) {
        console.log(message, nextValue);
      }
    },
    (error) => {
      if (debuggerOn) {
        console.error(message, error);
      }
    },
    () => {
      if (debuggerOn) {
        console.error('Observable completed - ', message);
      }
    }
  );
};

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: (...params) => Observable<T>;
  }
}
