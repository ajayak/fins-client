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

import { ItemGroupCreatorDialogComponent } from '../itemGroup-creator';
import { ItemGroup } from '../shared';

@Component({
  selector: 'fs-add-item-group',
  template: `
  <button 
      md-raised-button
      color='primary'
      [disabled]='dialogRef'
      (click)='openDialog()'
  >Add Root Item Group</button>
  `
})
export class AddItemGroupComponent {
  @Input() public parent: ItemGroup;
  @Output() public onRootItemGroupAdd = new EventEmitter();
  public dialogRef: MdDialogRef<ItemGroupCreatorDialogComponent>;

  constructor(private dialog: MdDialog) { }

  public openDialog() {
    this.dialogRef = this.dialog.open(ItemGroupCreatorDialogComponent, { data: this.parent });

    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.onRootItemGroupAdd.emit(result);
        this.dialogRef = null;
      });
  }
}
