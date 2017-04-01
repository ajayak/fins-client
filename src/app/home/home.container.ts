import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {
  Store,
  State
} from '../shared';

@Component({
  selector: 'fs-home',
  template: `
    <fs-navbar></fs-navbar>
    <fs-sidenav [open]="isSideNavOpen">
      <router-outlet></router-outlet>
    </fs-sidenav>
  `
})
// tslint:disable-next-line:component-class-suffix
export class HomeContainer implements OnInit, OnDestroy {
  public subscription: Subscription;
  public isSideNavOpen = false;

  constructor(private store: Store) { }

  public ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((state: State) => {
        this.isSideNavOpen = state.openSideNav;
        this.setBodyTheme(state.selectedTheme);
      });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setBodyTheme(theme: string) {
    document.querySelector('body').setAttribute('class', theme);
  }
}
