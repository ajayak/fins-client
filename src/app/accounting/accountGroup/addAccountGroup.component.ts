import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { AccountGroupCreatorDialogComponent } from './accountGroupCreator';
import { AccountGroupModel } from './accountGroup.model';

@Component({
  selector: 'fs-add-root-account-group',
  template: `
  <button 
      md-raised-button
      color='primary'
      (click)='openDialog()'
  >Add Root Account Group</button>
  {{selectedOption}}
  `
})
export class AddAccountGroupComponent {
  @Output() public onRootAccountGroupAdd = new EventEmitter();
  public selectedOption: string;

  constructor(public dialog: MdDialog) { }

  public openDialog() {
    const parent = { parentId: 0 };
    const dialogRef = this.dialog.open(AccountGroupCreatorDialogComponent, { data: parent });

    dialogRef.afterClosed()
      .subscribe(result => this.onRootAccountGroupAdd.emit(result));
  }
}
