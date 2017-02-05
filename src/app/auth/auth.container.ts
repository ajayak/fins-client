import { Component } from '@angular/core';

@Component({
  selector: 'fs-auth',
  template: `
    <signin-form
      (onSubmit)="onSubmit($event)"
    ></signin-form>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AuthContainer {

  public onSubmit($event) {
    console.log($event);
  }
}
