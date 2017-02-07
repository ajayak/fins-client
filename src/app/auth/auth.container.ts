import { Component } from '@angular/core';

import { SigninModel } from './signinForm';
import { AuthService } from './auth.service';
import { ToastService } from '../shared';

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
  constructor(
    private authService: AuthService,
    private toastr: ToastService) { }

  public onSubmit($event: SigninModel) {
    this.authService.authenticate($event)
      .subscribe(
      success => this.toastr.success({ titleText: 'Success' }),
      error => this.toastr.error({ title: error.error_description })
      );
  }

  public onForgotPasword(): void {
    // Navigate to forgot password page
    console.log('forgot password');
  }
}
