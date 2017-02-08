import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SideNavService } from '../sidenav';
import { Store } from '../../shared';

@Component({
  selector: 'fs-navbar',
  templateUrl: 'navbar.container.html',
  styleUrls: ['./navbar.container.scss']
})
// tslint:disable-next-line:component-class-suffix
export class NavbarContainer implements OnInit {
  public sideNavSubscription: Subscription;
  public openSideNav: boolean = false;

  constructor(
    private sidenav: SideNavService,
    private store: Store) { }

  public toggleSidenav() {
    this.sidenav.toggle();
  }

  public ngOnInit() {
    this.sideNavSubscription = this.store.changes
      .map(state => state.openSideNav)
      .subscribe(sideNavState => this.openSideNav = sideNavState);
  }
}
