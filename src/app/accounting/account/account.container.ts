import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'fs-account',
  template: `
    <fs-account-list></fs-account-list>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AccountContainer implements OnInit {
  constructor() { }

  public ngOnInit() {
    console.log('Initialized');
  }
}
