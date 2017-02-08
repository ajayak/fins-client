import { Component, OnInit } from '@angular/core';

import { SideNavService } from '../sidenav';

@Component({
  selector: 'fs-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private sidenav: SideNavService) { }

  public toggleSidenav() {
    this.sidenav.toggle();
  }
}
