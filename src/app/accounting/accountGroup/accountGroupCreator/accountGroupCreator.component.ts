import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators
} from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { AccountGroupService } from '../accountGroup.service';
import { AccountGroupModel } from '../accountGroup.model';
import { getControlErrors } from '../../../shared';
import { UserProfileService } from '../../../auth';

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
    private dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>,
    private accountGroupService: AccountGroupService,
    private cd: ChangeDetectorRef,
    private userProfileService: UserProfileService
  ) { }

  public ngOnInit() {
    const orgId = this.userProfileService.getOrgId();
    this.parent = this.dialogRef.config.data as AccountGroupModel;
    if (this.parent.parentId !== 0) {
      this.title = `Add ${this.parent.displayName}'s Child Account Group`;
    }

    this.accountGroupForm = this.fb.group({
      name: ['',
        [Validators.required, Validators.maxLength(200)],
        this.accountGroupAlreadyExistsValidator(orgId, this.parent.parentId)],
      displayName: ['', [Validators.required, Validators.maxLength(200)]],
      parentId: [this.parent.parentId],
      parentName: [this.parent.displayName]
    });
  }

  public accountGroupAlreadyExistsValidator(orgId: number, parentId: number) {
    return (control: AbstractControl) => {
      return this.accountGroupService
        .accountGroupExistsInOrganization(orgId, parentId, control.value)
        .toPromise()
        .then(result => {
          if (result === true) {
            return { accountGroupAlreadyExists: true };
          }
          return null;
        });
    };
  }

  public addAccountGroup($event) {
    $event.preventDefault();
    if (this.accountGroupForm.valid) {
      this.dialogRef.close(this.accountGroupForm.value);
    }
  }
}
