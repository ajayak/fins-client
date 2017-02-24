import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { tokenNotExpired } from '../shared';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  public canActivate() {
    // Check to see if a user has a valid JWT
    if (tokenNotExpired()) {
      // If they do, return true and allow the user to load the home component
      return true;
    }

    // If not, they redirect them to the login page
    this.authService.signout();
    return false;
  }
}
