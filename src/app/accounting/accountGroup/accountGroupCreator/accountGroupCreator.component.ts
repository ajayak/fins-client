import {
  Component,
  OnInit
} from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'fs-account-group-creator-dialog',
  templateUrl: './accountGroupCreator.component.html'
})
export class AccountGroupCreatorDialogComponent {
  constructor(public dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>) { }
}
