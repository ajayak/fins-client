import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators
} from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { isUndefined } from 'lodash';

import {
  AccountGroupTreeNode,
  AccountGroup,
  AccountGroupService
} from '../shared';
import { GenericValidator } from '../../../shared';
import { UserProfileService } from '../../../auth';

// Change Detection onPush not used due to async validator on name field
@Component({
  selector: 'fs-account-group-creator-dialog',
  templateUrl: './accountGroup-creator.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AccountGroupCreatorDialogComponent implements OnInit, AfterViewInit {
  public parent: AccountGroupTreeNode;
  public title: string = 'Add Root Account Group';
  public accountGroupForm: FormGroup;
  public displayMessage: { [key: string]: string } = {};
  public isReadonly: boolean;

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  private validationTimeout;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>,
    private accountGroupService: AccountGroupService,
    private userProfileService: UserProfileService
  ) {
    this.initializeErrorMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  public ngOnInit() {
    // In edit mode, parent is the account group to edit
    this.parent = this.dialogRef.config.data as AccountGroupTreeNode;
    this.isReadonly = this.parent.mode === 'View';
    this.setDialogTitle();

    const accountGroup = this.getAddUpdateAccountGroup();

    this.accountGroupForm = this.fb.group({
      name: [
        { value: accountGroup.name, disabled: this.isReadonly },
        [Validators.required, Validators.maxLength(200)],
        this.accountGroupAlreadyExistsValidator(accountGroup.parentId, accountGroup.name).bind(this)
      ],
      displayName: [
        { value: accountGroup.displayName, disabled: this.isReadonly },
        [Validators.required, Validators.maxLength(200)]
      ],
      parentId: [accountGroup.parentId],
      id: [accountGroup.id]
    });
  }

  public ngAfterViewInit(): void {
    this.accountGroupForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.accountGroupForm);
    });

    this.accountGroupForm.get('name').statusChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.accountGroupForm);
    });
  }

  public accountGroupAlreadyExistsValidator(parentId: number, originalName: string) {
    return (control: AbstractControl) => {
      clearTimeout(this.validationTimeout);
      return new Promise(resolve => {
        this.validationTimeout = setTimeout(() => {
          const accountGroupName = control.value;
          const exists = this.accountGroupService
            .accountGroupExistsInOrganization(parentId, accountGroupName, originalName);
          return exists ? resolve({ accountGroupAlreadyExists: true }) : resolve(null);
        }, 600);
      });
    };
  }

  public addUpdateAccountGroup($event) {
    $event.preventDefault();
    if (this.accountGroupForm.valid) {
      this.dialogRef.close(this.accountGroupForm.value);
    }
  }

  // Create object that is to be add/update
  private getAddUpdateAccountGroup(): AccountGroup {
    if (this.isEditMode() || this.isReadonly) {
      return {
        name: this.parent.label,
        displayName: this.parent.data,
        id: this.parent.id,
        isPrimary: this.parent.children.length === 0,
        parentId: this.parent.parentId
      };
    } else {
      let accountGroup = new AccountGroup();
      accountGroup.parentId = this.parent.id;
      return accountGroup;
    }
  }

  private setDialogTitle() {
    if (this.isReadonly) {
      this.title = `Account Group details`;
    } else if (this.isEditMode()) {
      this.title = `Edit ${this.parent.label}'s Child Account Group`;
    } else {
      if (this.parent.id !== 0) {
        this.title = `Add ${this.parent.label}'s Child Account Group`;
      } else {
        this.title = `Add Root Account Group`;
      }
    }
  }

  private isEditMode = (): boolean => this.parent.mode === 'Update';

  private initializeErrorMessages() {
    this.validationMessages = {
      name: {
        required: 'Name is required.',
        maxlength: 'Name cannot exceed 200 characters.',
        accountGroupAlreadyExists: 'Account Group with same name already exists under this parent.'
      },
      displayName: {
        required: 'Display Name name is required.',
        maxlength: 'Display Name name cannot exceed 200 characters.'
      }
    };
  }
}
