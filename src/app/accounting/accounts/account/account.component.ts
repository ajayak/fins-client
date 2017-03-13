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
  FormArray,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';

import { Account } from '../shared';
import { GenericValidator } from '../../../shared';

@Component({
  selector: 'fs-account-form',
  templateUrl: 'account.component.html',
  styles: [`
    #account-card {
      padding-bottom: 60px !important;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, AfterViewInit {
  @Input() public account: Account;
  @Input() public accountGroups: Array<{}> = [];
  @Output() public onAccountAdd = new EventEmitter();
  @Output() public onAccountUpdate = new EventEmitter();
  public displayMessage: { [key: string]: string } = {};
  public accountForm: FormGroup;
  public mode: string = 'Add';

  get persons(): FormArray {
    return <FormArray>this.accountForm.get('persons');
  }

  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder,
    private snackBar: MdSnackBar
  ) {
    this.initializeErrorMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  public ngOnInit(): void {
    const account = this.getAccount();
    this.mode = this.isEdit() ? 'Edit' : 'Add';
    this.setAccountForm(account);
  }

  public ngAfterViewInit(): void {
    this.accountForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.accountForm);
    });
  }

  public saveAccount(): void {
    if (this.persons.length === 0) {
      this.snackBar.open(`Please add atleast 1 contact person`, 'Close', { duration: 2000 });
      return;
    }
    console.log(this.accountForm.value);
  }

  public addPerson(): void {
    this.persons.push(this.buildPerson());
  }

  public deleteContact(index) {
    this.persons.removeAt(index);
  }

  private setAccountForm(account: Account) {
    this.accountForm = this.fb.group({
      id: [account.id],
      name: [account.name, [Validators.required, Validators.maxLength(200)]],
      displayName: [account.displayName, [Validators.required, Validators.maxLength(200)]],
      code: [account.code, [Validators.required, Validators.maxLength(200)]],
      openingBalance: [account.openingBalance, [Validators.maxLength(200)]],
      accountGroupId: [account.accountGroupId, [Validators.required]],
      address: [account.address, [Validators.maxLength(1000)]],
      stateId: [account.stateId, []],
      ward: [account.ward, [Validators.maxLength(50)]],
      itPanNumber: [account.itPanNumber, [Validators.maxLength(15)]],
      lstNumber: [account.lstNumber, [Validators.maxLength(15)]],
      cstNumber: [account.cstNumber, [Validators.maxLength(15)]],
      tinNumber: [account.tinNumber, [Validators.maxLength(15)]],
      serviceTaxNumber: [account.serviceTaxNumber, [Validators.maxLength(15)]],
      persons: this.fb.array([this.buildPerson()])
    });
  }

  private buildPerson(): FormGroup {
    return this.fb.group({
      id: [''],
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(1000)]],
      emailId: ['', [
        Validators.maxLength(250), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]
      ],
      telephone: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(12)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(12)]]
    });
  }

  private isEdit = () => this.account.id !== 0;

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
      },
      address: {
        maxlength: 'Address cannot exceed 1000 characters.'
      },
      ward: {
        maxlength: 'Ward cannot exceed 50 characters.'
      },
      itPanNumber: {
        maxlength: 'IT PAN Number cannot exceed 50 characters.'
      },
      lstNumber: {
        maxlength: 'LST Number cannot exceed 50 characters.'
      },
      cstNumber: {
        maxlength: 'CST Number cannot exceed 50 characters.'
      },
      tinNumber: {
        maxlength: 'TIN Number cannot exceed 50 characters.'
      },
      serviceTaxNumber: {
        maxlength: 'Service Tax Number cannot exceed 50 characters.'
      }
    };
  }
}
