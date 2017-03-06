import {
  Component,
  OnInit,
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

@Component({
  selector: 'fs-account-form',
  templateUrl: 'account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  @Input() public account: Account;
  @Output() public onAccountAdd = new EventEmitter();
  @Output() public onAccountUpdate = new EventEmitter();
  public accountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  public ngOnInit() {
    console.log('Initialized', this.account);
  }
}
