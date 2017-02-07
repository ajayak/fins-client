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
  <div style="height: 5px;">
    <md-progress-bar 
        mode="indeterminate" 
        *ngIf="visible">
    </md-progress-bar>
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
