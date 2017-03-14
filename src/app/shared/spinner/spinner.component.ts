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
  <md-progress-bar
      *ngIf="visible"
      mode="indeterminate"> 
  </md-progress-bar>
  `
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public visible = false;
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
