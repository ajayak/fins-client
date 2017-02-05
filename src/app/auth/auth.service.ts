import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {
  State,
  StoreHelper
} from '../store';


@Injectable()
export class AuthService implements CanActivate {
  private JWT_KEY: string = 'ng2_note_taker';
  private JWT: string = '';

  // constructor(
  //   private router: Router,
  //   private storeHelper: StoreHelper,
  //   private store: Store,
  //   private apiService: ApiService
  // ) {
  //   const token = window.localStorage.getItem(this.JWT_KEY);
  //   if (token) {
  //     this.setJwt(token);
  //   }
  // }

  // setJwt(jwt) {
  //   window.localStorage.setItem(this.JWT_KEY, jwt);
  //   this.apiService.setHeaders({ Authorization: `Bearer ${jwt}` });
  // }

  // isAuthorized(): boolean {
  //   return Boolean(this.JWT);
  // }

  canActivate(): boolean {
    // const canActivate = this.isAuthorized();
    // this.onCanActivate(canActivate);
    // return canActivate;
    return false;
  }

  // onCanActivate(canActivate: boolean) {
  //   if (!canActivate) {
  //     this.router.navigate(['', 'auth']);
  //   }
  // }

  // authenticate(path, credits): Observable<any> {
  //   return this.apiService.post(`/${path}`, credits)
  //     .do(res => this.setJwt(res.token))
  //     .do(res => this.storeHelper.update('user', res.data))
  //     .map(res => res.data);
  // }

  // signout() {
  //   window.localStorage.removeItem(this.JWT_KEY);
  //   this.store.purge();
  //   this.router.navigate(['', 'auth']);
  // }
}