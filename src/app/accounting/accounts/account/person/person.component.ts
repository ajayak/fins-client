import {
  Component,
  Input,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericValidator } from '../../../../shared';

@Component({
  selector: 'fs-person',
  templateUrl: './person.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent implements AfterViewInit {
  @Input() public personForm: FormGroup;
  public displayMessage: { [key: string]: string } = {};

  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor() {
    this.initializeErrorMessages();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  public ngAfterViewInit(): void {
    this.personForm.valueChanges.subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.personForm);
    });
  }

  private initializeErrorMessages() {
    this.validationMessages = {
      firstname: {
        required: 'First Name is required.',
        maxlength: 'First Name cannot exceed 50 characters.'
      },
      lastname: {
        required: 'Last Name is required.',
        maxlength: 'Last Name cannot exceed 50 characters.'
      },
      description: {
        maxlength: 'Description cannot exceed 1000 characters.'
      },
      emailId: {
        pattern: 'Email is not in valid format',
        maxlength: 'Email cannot exceed 250 characters.'
      },
      mobile: {
        required: 'Mobile No is required.',
        pattern: 'Mobile No is not in valid format',
        maxlength: 'Mobile No cannot exceed 12 characters.'
      }
    };
  }
}
