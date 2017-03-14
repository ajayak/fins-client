import {
  FormGroup,
  AbstractControl
} from '@angular/forms';

const formIsTouchedOrDirty = (c: AbstractControl): boolean => {
  return c.touched || c.dirty;
};

const formControlIsValid = (form: FormGroup, formControl: AbstractControl): boolean => {
  if (!formControl) {
    throw Error('Verify control name while getting control errors');
  }
  if (formIsTouchedOrDirty(formControl) && formControl.errors) {
    return false;
  }
  return true;
};

const generateErrorMessages = (errorType: string, info: any): string => {
  switch (errorType) {
    case 'required':
      return 'This field is required';
    case 'minlength':
      return `This field should contain atleast ${info.requiredLength} characters`;
    case 'maxlength':
      return `This field should contain maximum ${info.requiredLength} characters`;

    case 'accountGroupAlreadyExists':
      return `Account group with same name already exists under this parent`;
    default:
      console.info(errorType, info);
      return 'Unknown Error. Added this error to error list';
  }
};

export const controlIsValid = (form: FormGroup, control: string): boolean => {
  let formControl = form.get(control);
  return formControlIsValid(form, formControl);
};

export const getControlErrors = (form: FormGroup, control: string): string[] | null => {
  let formControl = form.get(control);
  if (formControlIsValid(form, formControl)) {
    return null;
  }
  let errors = formControl.errors;
  let errorMessages = Object.keys(errors)
    .map((key) => generateErrorMessages(key, errors[key]));
  return errorMessages;
};

/*
//Use with the generic validation message class
displayMessage: { [key: string]: string } = {};
private validationMessages: { [key: string]: { [key: string]: string } };
this.validationMessages = {
  productName: {
      required: 'Product name is required.',
      minlength: 'Product name must be at least three characters.',
      maxlength: 'Product name cannot exceed 50 characters.'
  }
};

// Define an instance of the validator for use with this form,
// passing in this form's set of validation messages.
this.genericValidator = new GenericValidator(this.validationMessages);

public ngAfterViewInit(): void {
  this.signinForm.valueChanges.debounceTime(500).subscribe(() => {
    this.displayMessage = this.genericValidator.processMessages(this.signinForm);
  });
}

<span *ngIf="displayMessage.productName">
  {{displayMessage.productName}}
</span>
*/

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class GenericValidator {

  // Provide the set of valid validation messages
  // Stucture:
  // controlName1: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // },
  // controlName2: {
  //     validationRuleName1: 'Validation Message.',
  //     validationRuleName2: 'Validation Message.'
  // }
  constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {

  }

  // Processes each control within a FormGroup
  // And returns a set of validation messages to display
  // Structure
  // controlName1: 'Validation Message.',
  // controlName2: 'Validation Message.'
  public processMessages(container: FormGroup): { [key: string]: string } {
    let messages = {};
    for (let controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        let c = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          let childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}
