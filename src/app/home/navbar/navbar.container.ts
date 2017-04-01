import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { SideNavService } from '../sidenav';
import {
  Store,
  State
} from '../../shared';
import { AuthService } from '../../auth/shared';

@Component({
  selector: 'fs-navbar',
  templateUrl: 'navbar.container.html',
  styleUrls: ['./navbar.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      .subscribe((state: State) => {
        this.openSideNav = state.openSideNav;
        this.selectTheme(state.selectedTheme);
      });
  }

  public ngOnDestroy() {
    this.sideNavSubscription.unsubscribe();
  }

  public selectTheme(theme: string) {
    console.log(theme);
  }

  public signout() {
    this.authService.signout();
  }
}
