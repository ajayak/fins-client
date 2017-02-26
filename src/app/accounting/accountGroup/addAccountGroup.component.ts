import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';

import { AccountGroupCreatorDialogComponent } from './accountGroupCreator';
import { AccountGroupModel } from './accountGroup.model';

@Component({
  selector: 'fs-add-account-group',
  template: `
  <button 
      md-raised-button
      color='primary'
      [disabled]='dialogRef'
      (click)='openDialog()'
  >Add Root Account Group</button>
  `
})
export class AddAccountGroupComponent {
  @Input() public parent: AccountGroupModel;
  @Output() public onRootAccountGroupAdd = new EventEmitter();
  public dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>;

  constructor(public dialog: MdDialog) { }

  public openDialog() {
    this.dialogRef = this.dialog.open(AccountGroupCreatorDialogComponent, { data: this.parent });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.onRootAccountGroupAdd.emit(result);
        this.dialogRef = null;
      });
  }
}
