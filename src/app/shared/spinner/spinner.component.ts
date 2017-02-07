import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '../store';

@Component({
  selector: 'fs-spinner',
  template: `
  <div *ngIf="visible">
    <md-progress-bar mode="indeterminate"></md-progress-bar>
  </div>
  `
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public visible: boolean = false;
  private subscription: Subscription;

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.subscription = this.store.changes
      .map(state => state.showSpinner)
      .subscribe(spinnerState => this.visible = spinnerState);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
