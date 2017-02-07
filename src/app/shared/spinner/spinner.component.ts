import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '../store';

@Component({
  selector: 'fs-spinner',
  template: `
  <div *ngIf="visible">
    <md-spinner color="accent"></md-spinner>
  </div>
  `
})
export class SpinnerComponent implements OnInit {
  public visible: boolean = false;

  constructor(private store: Store) { }

  public ngOnInit() {
    this.store.changes
      .map(state => state.showSpinner)
      .subscribe(spinnerState => this.visible = spinnerState);
  }
}
