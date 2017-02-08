import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
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
