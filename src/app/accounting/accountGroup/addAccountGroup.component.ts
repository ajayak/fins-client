import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { AccountGroupCreatorDialogComponent } from './accountGroupCreator';

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
    let dialogRef = this.dialog.open(AccountGroupCreatorDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  public addRootAccountGroup() {
    this.onRootAccountGroupAdd.emit();
  }
}
