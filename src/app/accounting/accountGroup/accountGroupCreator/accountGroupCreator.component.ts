import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { AccountGroupModel } from '../accountGroup.model';

import { getControlErrors } from '../../../shared';

@Component({
  selector: 'fs-account-group-creator-dialog',
  templateUrl: './accountGroupCreator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGroupCreatorDialogComponent implements OnInit {
  public parent: AccountGroupModel;
  public title: string = 'Add Root Account Group';
  public accountGroupForm: FormGroup;
  public getControlErrors = getControlErrors;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>
  ) { }

  public ngOnInit() {
    this.parent = this.dialogRef.config.data as AccountGroupModel;
    if (this.parent.parentId !== 0) {
      this.title = `Add ${this.parent.displayName}'s Child Account Group`;
    }

    this.accountGroupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      displayName: ['', [Validators.required, Validators.maxLength(200)]],
      parentId: [this.parent.parentId],
      parentName: [this.parent.displayName]
    });
  }

  public addAccountGroup($event) {
    $event.preventDefault();
    if (this.accountGroupForm.valid) {
      this.dialogRef.close(this.accountGroupForm.value);
    }
  }
}
