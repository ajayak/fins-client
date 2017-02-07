import { Injectable } from '@angular/core';
import {
  Router
  , CanActivate
} from '@angular/router';

import { tokenNotExpired } from '../shared';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  public canActivate() {
    // Check to see if a user has a valid JWT
    if (tokenNotExpired()) {
      // If they do, return true and allow the user to load the home component
      return true;
    }

    // If not, they redirect them to the login page
    this.router.navigate(['', 'auth']);
    return false;
  }
}