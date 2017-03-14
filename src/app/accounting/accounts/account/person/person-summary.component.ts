import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Person } from '../../shared';

@Component({
  selector: 'fs-person-summary',
  template: `
    <md-list-item>
      <md-icon md-list-avatar>person</md-icon>
      <h3 md-line>{{person.firstname}} {{person.lastname}}</h3>
      <h4 md-line *ngIf="person.emailId" >{{person.emailId}}</h4>
      <p md-line *ngIf="person.mobile">{{person.mobile}}</p>

      <button md-raised-button
              color="warn"
              (click)="deletePerson()">
        Remove
      </button>
    </md-list-item>
  `
})
export class PersonSummaryComponent implements OnInit, OnDestroy {
  @Input() public personForm: FormGroup;
  @Output() public onPersonDelete = new EventEmitter();
  public person;
  private subscription: Subscription;

  public ngOnInit() {
    this.person = this.personForm.value;
    this.subscription = this.personForm.valueChanges.subscribe(value => {
      this.person = this.personForm.value;
    });
  }

  public deletePerson() {
    this.onPersonDelete.emit();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
