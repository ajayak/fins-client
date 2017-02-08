import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../shared';

@Component({
  selector: 'home',
  template: `
    <fs-navbar></fs-navbar>
    <fs-sidenav [open]="isSideNavOpen"></fs-sidenav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class HomeContainer implements OnInit, OnDestroy {
  public subscription: Subscription;
  public isSideNavOpen: boolean = false;

  constructor(private store: Store) { }

  public ngOnInit() {
    this.subscription = this.store.changes
      .map(state => state.openSideNav)
      .subscribe(sidenavState => this.isSideNavOpen = sidenavState);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
