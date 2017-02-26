import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { GenericValidator } from '../../shared';

@Component({
  selector: 'signin-form',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit, AfterViewInit {
  @Output() public onSubmit = new EventEmitter();
  @Output() public onForgotPassword = new EventEmitter();
  public signinForm: FormGroup;
  public displayMessage: { [key: string]: string } = {};

  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(
    private fb: FormBuilder
  ) {
    this.initializeErrorMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  public ngOnInit(): void {
    this.signinForm = this.fb.group({
      organization: ['fs', [Validators.required, Validators.maxLength(50)]],
      username: ['organization@example.com', [Validators.required, Validators.maxLength(250)]],
      password: ['YouShouldChangeThisPassword1!', [Validators.required]]
    });
  }

  public ngAfterViewInit(): void {
    this.signinForm.valueChanges.debounceTime(500).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.signinForm);
    });
  }

  public signIn($event): void {
    $event.preventDefault();
    if (this.signinForm.valid) {
      this.onSubmit.emit(this.signinForm.value);
    }
  }

  private initializeErrorMessages() {
    this.validationMessages = {
      organization: {
        required: 'Organization name is required.',
        maxlength: 'Organization name cannot exceed 50 characters.'
      },
      username: {
        required: 'User Name name is required.',
        maxlength: 'User Name name cannot exceed 50 characters.'
      },
      password: {
        required: 'Password name is required.'
      }
    };
  }
}
