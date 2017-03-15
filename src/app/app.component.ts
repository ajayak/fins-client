/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Store } from './shared';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'fs-app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <fs-spinner></fs-spinner>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  constructor(public appState: Store) { }

  public ngOnInit() {
    this.appState.changes.subscribe((state) => {
      window['state'] = state;
    });
  }
}
