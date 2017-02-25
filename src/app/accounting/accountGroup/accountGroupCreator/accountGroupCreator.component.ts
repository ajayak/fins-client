import {
  Component,
  OnInit
} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AccountGroupModel } from '../accountGroup.model';

@Component({
  selector: 'fs-account-group-creator-dialog',
  templateUrl: './accountGroupCreator.component.html'
})
export class AccountGroupCreatorDialogComponent implements OnInit {
  public parent: AccountGroupModel;
  public title: string = 'Add Root Account Group';
  constructor(
    public dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>
  ) { }

  public ngOnInit() {
    this.parent = this.dialogRef.config.data as AccountGroupModel;
    if (this.parent.parentId !== 0) {
      this.title = `Add ${this.parent.displayName}'s Child Account Group`;
    }
  }

  public addAccountGroup() {
    this.dialogRef.close('Option 1');
  }
}
