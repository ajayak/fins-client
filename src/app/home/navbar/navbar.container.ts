import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { SideNavService } from '../sidenav';

@Component({
  selector: 'fs-navbar',
  templateUrl: 'navbar.container.html',
  styleUrls: ['./navbar.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class NavbarContainer {
  constructor(private sidenav: SideNavService) { }

  public toggleSidenav() {
    this.sidenav.toggle();
  }
}
