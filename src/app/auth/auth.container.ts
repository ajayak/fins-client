import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    private toastr: ToastService,
    private router: Router) { }

  public onSubmit($event: SigninModel) {
    this.authService.authenticate($event)
      .subscribe(
      success => this.onLoginSuccess(success),
      error => this.onLoginError(error));
  }

  public onForgotPasword(): void {
    // Navigate to forgot password page
    console.log('forgot password');
  }

  private onLoginSuccess(success) {
    this.toastr.success({
      titleText: 'Success',
      timer: 1500,
      showCloseButton: true,
      onClose: () => this.router.navigate(['', 'home'])
    });
  }

  private onLoginError(error) {
    this.toastr.error({ titleText: error.error_description });
  }
}
