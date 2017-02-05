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
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ state |  json }}</pre>
  `
})
export class AppComponent implements OnInit {
  public state;

  constructor(public appState: Store) { }

  public ngOnInit() {
    console.log('Initial App State', this.appState.getState());
    this.appState.changes.subscribe((state) => this.state = state);
  }
}
