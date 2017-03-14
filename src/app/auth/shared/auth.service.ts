import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  Store,
  StoreHelper,
  StateHelper,
  tokenNotExpired
} from '../../shared';
import {
  JwtHelperService,
  ApiService,
  LogService
} from '../../shared/services';
import { SigninModel } from '../signinForm';
import { AuthTokenModel } from './auth-token.model';

import { config } from '../../core';

@Injectable()
export class AuthService {
  private JWT_ID_KEY: string = config.appKeys.jwtIdKey;
  private JWT_ACCESS_KEY: string = config.appKeys.jwtAccessKey;
  private JWT = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: Store,
    private storeHelper: StoreHelper,
    private logger: LogService,
    private jwtHelper: JwtHelperService
  ) {
    const idToken = window.localStorage.getItem(this.JWT_ID_KEY);
    const accessToken = window.localStorage.getItem(this.JWT_ACCESS_KEY);
    if (tokenNotExpired()) {
      this.setJwt(accessToken, idToken);
    }
  }

  public setJwt(accessToken: string, idToken: string) {
    window.localStorage.setItem(this.JWT_ACCESS_KEY, accessToken);
    window.localStorage.setItem(this.JWT_ID_KEY, idToken);
    this.apiService.setHeaders({ Authorization: `Bearer ${accessToken}` });
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

    return this.apiService.formEncodedPost(authUrl, this.encodeObjectToParams(openIdRequest))
      .do((res) => this.setJwt(res.access_token, res.id_token))
      .do((res) => {
        const user = this.jwtHelper.decodeToken(res.id_token);
        const authToken = new AuthTokenModel(user);
        this.storeHelper.update(StateHelper.auth, authToken);
      })
      .map((res) => res.data);
  }

  public signout() {
    window.localStorage.removeItem(this.JWT_ID_KEY);
    window.localStorage.removeItem(this.JWT_ACCESS_KEY);
    this.store.purge();
    this.router.navigate(['', 'auth']);
  }

  private encodeObjectToParams(obj: any): string {
    return Object.keys(obj)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&');
  }
}
