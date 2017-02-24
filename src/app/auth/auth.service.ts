import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { tokenNotExpired } from '../shared';

import {
  Store,
  StoreHelper,
  StateHelper,
  JwtHelperService
} from '../shared';
import {
  ApiService,
  LogService
} from '../shared';
import { SigninModel } from './signinForm';
import { AuthTokenModel } from './auth-token.model';

import { config } from '../core';

@Injectable()
export class AuthService {
  private JWT_KEY: string = config.appKeys.jwtKey;
  private JWT: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store,
    private storeHelper: StoreHelper,
    private logger: LogService,
    private jwtHelper: JwtHelperService
  ) {
    const token = window.localStorage.getItem(this.JWT_KEY);
    if (tokenNotExpired()) {
      this.setJwt(token);
    }
  }

  public setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.apiService.setHeaders({ Authorization: `Bearer ${jwt}` });
  }

  public isAuthorized(): boolean {
    return tokenNotExpired();
  }

  public authenticate(credits: SigninModel): Observable<any> {
    const authUrl = config.urls.token;
    const openIdRequest = {
      username: credits.username,
      password: credits.password,
      organization: credits.organization,
      grant_type: 'password',
      scope: 'openid email profiles roles offline_access'
    };

    return this.apiService.formEncodedPost(`/${authUrl}`, this.encodeObjectToParams(openIdRequest))
      .do((res) => this.setJwt(res.access_token))
      .do((res) => {
        const user = this.jwtHelper.decodeToken(res.id_token);
        const authToken = new AuthTokenModel(user);
        this.storeHelper.update(StateHelper.auth, authToken);
      })
      .map((res) => res.data);
  }

  public signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.store.purge();
    this.router.navigate(['', 'auth']);
  }

  private encodeObjectToParams(obj: any): string {
    return Object.keys(obj)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&');
  }
}
