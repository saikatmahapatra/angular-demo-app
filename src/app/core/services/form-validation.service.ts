import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { regEx } from '../../common/utility/regEx';
@Injectable()
export class FormValidationService {

  constructor() { }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getValidatorErrorMessage(rule: string, validatorValue?: any) {
    const errorMessage: any = {
      required: 'The field is required.',
      minlength: `The field must be at least ${validatorValue?.requiredLength} characters long.`,
      maxlength: `The field cannot be more than ${validatorValue?.requiredLength} characters long.`,
      email: 'Please enter a valid email address.',
      validEmail: 'Please enter a valid email address i.e yourname@domain.com.',
      phoneNumber: 'Please enter a 10 digit phone number.',
      ruleOne: 'error message 1',
      ruleTwo: 'error message 2',
      ruleThreec: 'error message 3',
      invalidPassword: 'Password must be 8 chars long including at least one lower case letter, one uppercase letter, one number',
      invalidDomain: 'Please enter email with @gmail.com only',
      matching: 'Confirm Password should match with Password',
      userNameExists: 'This username is already registered'
  };
  if(errorMessage[rule]) {
      return errorMessage[rule];
  } else {
      return 'Rule: ' + rule + ' : This field has a generic error.';
  }
  }

  validEmail(control: AbstractControl) {
    const valid = control?.value?.match(regEx.email);
    return valid ? null : { 'validEmail': true };
  }

  phoneNumber(control: AbstractControl) {
    const valid = control?.value?.match(regEx.phone_number_US);
    return valid ? null : { 'phoneNumber': true };
  }

  test1(control: AbstractControl) {
    return (control?.value == 'one') ? { 'ruleOne': true } : null;
  }

  test2(control: AbstractControl) {
    return (control?.value == 'two') ? { 'ruleTwo': true } : null;
  }

  test3(control: AbstractControl) {
    return (control?.value == 'three') ? { 'ruleThree': true } : null;
  }

  strongPassword(control: AbstractControl) {
    // password should have minimum 8 chars long with 1 lower case, 1 upper case & 1 number
    const regex = new RegExp(regEx.strong_password);
    const valid = regex.test(control.value);
    return valid ? null : { 'invalidPassword': true };
  }

  validEmailDomain(control: AbstractControl) {
    let error = null;
    if (control?.value && control?.value.indexOf("@") != -1) {
      let [_, domain] = control?.value.split("@");
      if (domain == "gmail.com") {
        error = null;
      } else {
        error = { 'invalidDomain': true };
      }
    }
    return error;
  }

  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent && !!control.parent.value && control.value === (control.parent?.controls as any)[matchTo].value ? null : { matching: true };
    };
  }

}
