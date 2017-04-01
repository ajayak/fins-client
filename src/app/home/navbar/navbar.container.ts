import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { SideNavService } from '../sidenav';
import { Store } from '../../shared';
import { AuthService } from '../../auth/shared';

@Component({
  selector: 'fs-navbar',
  templateUrl: 'navbar.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  .spacer {
    flex: 1 1 auto;
  }
  `]
})
// tslint:disable-next-line:component-class-suffix
export class NavbarContainer implements OnInit, OnDestroy {
  public sideNavSubscription: Subscription;
  public openSideNav = false;

  constructor(
    private sidenav: SideNavService,
    private store: Store,
    private router: Router,
    private authService: AuthService) {
  }

  public toggleSidenav() {
    this.sidenav.toggle();
  }

  public ngOnInit() {
    this.sideNavSubscription = this.store.changes
      .map(state => state.openSideNav)
      .subscribe(sideNavState => this.openSideNav = sideNavState);
  }

  public ngOnDestroy() {
    this.sideNavSubscription.unsubscribe();
  }

  public signout() {
    this.authService.signout();
  }
}
