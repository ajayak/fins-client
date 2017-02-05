import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared';
import {
  State,
  Store,
  StoreHelper
} from '../store';
import { config } from '../core';

@Injectable()
export class AuthService implements CanActivate {
  private JWT_KEY: string = config.appKeys.jwtKey;
  private JWT: string = '';

  constructor(
    private router: Router,
    private storeHelper: StoreHelper,
    private store: Store,
    private apiService: ApiService
  ) {
    const token = window.localStorage.getItem(this.JWT_KEY);
    if (token) {
      this.setJwt(token);
    }
  }

  public setJwt(jwt) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.apiService.setHeaders({ Authorization: `Bearer ${jwt}` });
  }

  public isAuthorized(): boolean {
    return Boolean(this.JWT);
  }

  public canActivate(): boolean {
    const canActivate = this.isAuthorized();
    this.onCanActivate(canActivate);
    return canActivate;
  }

  public onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['', 'auth']);
    }
  }

  public authenticate(path, credits): Observable<any> {
    return this.apiService.post(`/${path}`, credits)
      .do((res) => this.setJwt(res.token))
      .do((res) => this.storeHelper.update('user', res.data))
      .map((res) => res.data);
  }

  public signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.store.purge();
    this.router.navigate(['', 'auth']);
  }
}
