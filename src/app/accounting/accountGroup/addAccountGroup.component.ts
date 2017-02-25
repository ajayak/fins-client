import {
  Component,
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
  selector: 'fs-add-root-account-group',
  template: `
  <button 
      md-raised-button
      color='primary'
      [disabled]='dialogRef'
      (click)='openDialog()'
  >Add Root Account Group</button>
  {{selectedOption}}
  `
})
export class AddAccountGroupComponent {
  @Output() public onRootAccountGroupAdd = new EventEmitter();
  public selectedOption: string;
  public dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>;

  constructor(public dialog: MdDialog) { }

  public openDialog() {
    let parent = { parentId: 0 };
    this.dialogRef = this.dialog.open(AccountGroupCreatorDialogComponent, { data: parent });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.onRootAccountGroupAdd.emit(result);
        this.dialogRef = null;
      });
  }
}
