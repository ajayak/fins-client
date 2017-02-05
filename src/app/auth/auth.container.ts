import { Component } from '@angular/core';

import { SigninModel } from './signinForm';
import { AuthService } from './auth.service';

@Component({
  selector: 'fs-auth',
  template: `
    <signin-form
      (onSubmit)="onSubmit($event)"
      (onForgotPassword)="onForgotPasword()"
    ></signin-form>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AuthContainer {
  constructor(private authService: AuthService) { }

  public onSubmit($event: SigninModel) {
    this.authService.authenticate($event)
      .subscribe((e) => console.log(e));
  }

  public onForgotPasword(): void {
    // Navigate to forgot password page
    console.log('forgot password');
  }
}
