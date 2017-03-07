import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Account } from '../shared';
import { GenericValidator } from '../../../shared';

@Component({
  selector: 'fs-account-form',
  templateUrl: 'account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, AfterViewInit {
  @Input() public account: Account;
  @Input() public accountGroups: Array<{}> = [];
  @Output() public onAccountAdd = new EventEmitter();
  @Output() public onAccountUpdate = new EventEmitter();
  public displayMessage: { [key: string]: string } = {};
  public accountForm: FormGroup;

  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder) {
    this.initializeErrorMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  public ngOnInit(): void {
    const account = this.getAccount();
    this.setAccountForm(account);
  }

  public ngAfterViewInit(): void {
    this.accountForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.accountForm);
    });
  }

  public saveAccount(): void {
    console.log(this.accountForm.value);
  }

  private setAccountForm(account: Account) {
    this.accountForm = this.fb.group({
      id: [account.id],
      name: [account.name, [Validators.required, Validators.maxLength(200)]],
      displayName: [account.displayName, [Validators.required, Validators.maxLength(200)]],
      code: [account.code, [Validators.required, Validators.maxLength(200)]],
      openingBalance: [account.openingBalance, [Validators.maxLength(200)]],
      accountGroupId: [account.accountGroupId, [Validators.required]]
    });
  }

  private getAccount(): Account {
    if (this.account) { return { ...this.account }; }
    return new Account();
  }

  private initializeErrorMessages() {
    this.validationMessages = {
      name: {
        required: 'Account name is required.',
        maxlength: 'Account name cannot exceed 200 characters.'
      },
      displayName: {
        required: 'Display name is required.',
        maxlength: 'Display name cannot exceed 200 characters.'
      },
      code: {
        required: 'Account code is required.',
        maxlength: 'Account code cannot exceed 50 characters.'
      },
      accountGroupId: {
        required: 'Account group is required.'
      }
    };
  }
}
