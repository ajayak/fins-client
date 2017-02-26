import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

import { AccountGroupService } from '../accountGroup.service';
import { AccountGroupModel } from '../accountGroup.model';
import { GenericValidator } from '../../../shared';
import { UserProfileService } from '../../../auth';

@Component({
  selector: 'fs-account-group-creator-dialog',
  templateUrl: './accountGroupCreator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountGroupCreatorDialogComponent implements OnInit, AfterViewInit {
  public parent: AccountGroupModel;
  public title: string = 'Add Root Account Group';
  public accountGroupForm: FormGroup;
  public displayMessage: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MdDialogRef<AccountGroupCreatorDialogComponent>,
    private accountGroupService: AccountGroupService,
    private cd: ChangeDetectorRef,
    private userProfileService: UserProfileService
  ) {
    this.initializeErrorMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

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

  public ngAfterViewInit(): void {
    Observable.merge(
      this.accountGroupForm.valueChanges,
      this.accountGroupForm.get('name').statusChanges
    ).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.accountGroupForm);
    });
  }

  public accountGroupAlreadyExistsValidator(orgId: number, parentId: number) {
    return (control: AbstractControl) => {
      return new Observable((obs: any) => {
        // TODO: Stop extra network calls here!
        control
          .valueChanges
          .debounceTime(500)
          .filter(value => value.length > 0)
          .distinctUntilChanged()
          .flatMap(accountGroupName => {
            return this.accountGroupService
              .accountGroupExistsInOrganization(orgId, parentId, accountGroupName);
          })
          .subscribe(
          result => {
            result === true ?
              obs.next({ accountGroupAlreadyExists: true }) : obs.next(null);
            obs.complete();
          },
          error => {
            obs.next(null);
            obs.complete();
          }
          );
      });
    };
  }

  public addAccountGroup($event) {
    $event.preventDefault();
    if (this.accountGroupForm.valid) {
      this.dialogRef.close(this.accountGroupForm.value);
    }
  }

  private initializeErrorMessages() {
    this.validationMessages = {
      name: {
        required: 'Name is required.',
        maxlength: 'Name cannot exceed 200 characters.',
        accountGroupAlreadyExists: 'Account Group with same name already exists under this parent'
      },
      displayName: {
        required: 'Display Name name is required.',
        maxlength: 'Display Name name cannot exceed 200 characters.'
      }
    };
  }
}
