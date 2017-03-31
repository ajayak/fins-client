import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
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
import { MdSnackBar } from '@angular/material';

import {
  TransactionType,
  EnumEx
} from '../../../core';
import {
  Account,
  Person
} from '../shared';
import { GenericValidator } from '../../../shared';
import { NameCode } from '../../../shared/models';

@Component({
  selector: 'fs-account-form',
  templateUrl: 'account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public account: Account;
  @Input() public accountGroups: Array<{}> = [];
  @Input() public states: NameCode<number>[] = [];
  @Output() public onAccountAdd = new EventEmitter();
  @Output() public onAccountUpdate = new EventEmitter();
  public transactionTypes = EnumEx.getNamesAndValuesString(TransactionType);
  public displayMessage: { [key: string]: string } = {};
  public accountForm: FormGroup;
  public mode = 'Add';

  get contactPersons(): FormArray {
    return <FormArray>this.accountForm.get('contactPersons');
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
    this.mode = this.isEditMode() ? 'Update' : 'Add';
    this.setAccountForm(account);
  }

  public ngAfterViewInit(): void {
    this.toggleOpeningBalance({ checked: !!this.account.openingBalance });
    this.accountForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.accountForm);
    });
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }

  public saveAccount(): void {
    if (this.contactPersons.length === 0) {
      this.snackBar.open(`Please add atleast 1 contact person`, 'Close', { duration: 2000 });
      return;
    }
    const value = this.accountForm.value;
    this.isEditMode() ? this.onAccountUpdate.emit(value) : this.onAccountAdd.emit(value);
  }

  public toggleOpeningBalance({ checked }: { checked: boolean }) {
    const openingBalance = this.accountForm.get('openingBalance');
    const openingBalanceType = this.accountForm.get('openingBalanceType');
    if (checked) {
      openingBalance.enable();
      openingBalanceType.enable();
      openingBalance.setValidators([
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')
      ]);
      openingBalance.updateValueAndValidity();
    } else {
      openingBalance.setValue(0);
      openingBalance.clearValidators();
      openingBalance.disable();
      openingBalanceType.disable();
    }
  }

  public addPerson(): void {
    this.contactPersons.push(this.buildPerson(new Person()));
  }

  public deleteContact(index) {
    this.contactPersons.removeAt(index);
  }

  private setAccountForm(account: Account) {
    this.accountForm = this.fb.group({
      id: [account.id],
      name: [account.name, [Validators.required, Validators.maxLength(200)]],
      displayName: [account.displayName, [Validators.required, Validators.maxLength(200)]],
      code: [account.code, [Validators.required, Validators.maxLength(200)]],
      openingBalance: [account.openingBalance],
      openingBalanceType: [account.openingBalanceType.toString()],
      accountGroupId: [account.accountGroupId, [Validators.required]],
      address: [account.address, [Validators.maxLength(1000)]],
      stateId: [account.stateId, []],
      ward: [account.ward, [Validators.maxLength(50)]],
      itPanNumber: [account.itPanNumber, [Validators.maxLength(15)]],
      lstNumber: [account.lstNumber, [Validators.maxLength(15)]],
      cstNumber: [account.cstNumber, [Validators.maxLength(15)]],
      tinNumber: [account.tinNumber, [Validators.maxLength(15)]],
      serviceTaxNumber: [account.serviceTaxNumber, [Validators.maxLength(15)]],
      contactPersons: this.fb.array(this.buildPersons(account.contactPersons))
    });
  }

  private buildPersons(persons: Person[]): FormGroup[] {
    if (persons.length === 0) {
      const person = new Person();
      persons.push(person);
    }
    return persons.map(person => this.buildPerson(person));
  }

  private buildPerson(person: Person): FormGroup {
    return this.fb.group({
      id: [person.id],
      firstname: [person.firstName, [Validators.required, Validators.maxLength(50)]],
      lastname: [person.lastName, [Validators.required, Validators.maxLength(50)]],
      description: [person.description, [Validators.maxLength(1000)]],
      emailId: [person.emailId, [
        Validators.maxLength(250),
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]
      ],
      mobile: [person.mobile,
      [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(12)]]
    });
  }

  private isEditMode = () => this.account.id !== 0;

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
      openingBalance: {
        required: 'Opening Balance is required.',
        maxlength: 'Opening Balance cannot exceed 10 characters.',
        pattern: 'Opening Balance is not in valid format',
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
