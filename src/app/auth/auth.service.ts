import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  Store,
  StoreHelper
} from '../shared';
import {
  ApiService,
  LogService
} from '../shared';
import { SigninModel } from './signinForm';

import { config } from '../core';

@Injectable()
export class AuthService implements CanActivate {
  private JWT_KEY: string = config.appKeys.jwtKey;
  private JWT: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store,
    private storeHelper: StoreHelper,
    private logger: LogService
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

  public authenticate(credits: SigninModel): Observable<any> {
    const authUrl = config.urls.token;
    const openIdRequest =
      `username=${credits.username}&` +
      `password=${credits.password}&` +
      `tenant=${credits.tenant}&` +
      `grant_type=password&` +
      `scope=openid email profiles roles`;

    return this.apiService.formEncodedPost(`/${authUrl}`, openIdRequest)
      .do((res) => this.setJwt(res.id_token))
      .do((res) => this.storeHelper.update('user', res.data))
      .map((res) => res.data);
  }

  public signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.store.purge();
    this.router.navigate(['', 'auth']);
  }
}
