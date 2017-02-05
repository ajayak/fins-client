import { Component } from '@angular/core';

import { SigninModel } from './signinForm';

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

  public onSubmit($event: SigninModel) {
    console.log($event);
  }

  public onForgotPasword(): void {
    // Navigate to forgot password page
    console.log('forgot password');
  }
}
