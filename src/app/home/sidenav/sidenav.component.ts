import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../../shared/store';

@Component({
  selector: 'fs-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.container.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public sideNavOpen: boolean = false;
  public folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  public notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor(private store: Store) { }

  public ngOnInit() {
    this.subscription = this.store.changes
      .map(state => state.openSideNav)
      .subscribe(sidenavState => this.sideNavOpen = sidenavState);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
