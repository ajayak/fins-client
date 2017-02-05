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
