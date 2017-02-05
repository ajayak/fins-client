import {
  Component,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { getControlErrors } from '../../shared';

@Component({
  selector: 'signin-form',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @Output() public onsubmit = new EventEmitter();
  @Output() public onForgotPassword = new EventEmitter();
  public signinForm: FormGroup;
  public getControlErrors = getControlErrors;

  constructor(private fb: FormBuilder) { }

  public signIn(): void {
    if (this.signinForm.valid) {
      this.onsubmit.emit(this.signinForm.value);
    }
  }

  public ngOnInit(): void {
    this.signinForm = this.fb.group({
      tenant: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.maxLength(250)]],
      password: ['', [Validators.required]]
    });
  }
}
