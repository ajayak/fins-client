import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import {
  tokenNotExpired,
  ToastService
} from '../../../shared/services';
import { UserProfileService } from '../../../auth';

@Injectable()
export class ItemGuard implements CanActivate {
  constructor(
    private userProfile: UserProfileService,
    private toastr: ToastService) { }

  public canActivate() {
    // Check to see if a user has a valid JWT
    // And user is Item Manager
    if (tokenNotExpired() && this.userProfile.isItemManager()) {
      // If they do, return true and allow the user to load the component
      return true;
    }

    // If not, they redirect them to the login page
    this.toastr.warn({ titleText: 'You do not have rights to access this page' });
    return false;
  }
}
