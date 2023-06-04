import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormGroup,UntypedFormControl, AbstractControl, ValidatorFn, ValidationErrors, FormArray } from '@angular/forms';
import { regEx } from '../../@utils/const/regEx';
@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getValidatorErrorMessage(rule: string, validatorValue?: any) {
    const errorMessage: any = {
      required: 'The field is required.',
      minlength: `The field must be at least ${validatorValue?.requiredLength} characters long.`,
      maxlength: `The field cannot be more than ${validatorValue?.requiredLength} characters long.`,
      min: `Min value must be at least ${validatorValue?.min}.`,
      max: `Value should not exceed more than ${validatorValue?.max}.`,
      email: 'Please enter a valid email address.',
      validEmail: 'Please enter a valid email address i.e name@example.com.',
      phoneNumber: 'Please enter a 10 digit phone number.',
      ruleOne: 'error message 1',
      ruleTwo: 'error message 2',
      ruleThreec: 'error message 3',
      invalidPassword: 'Password must be 8 chars long including at least one lower case letter, one uppercase letter, one number.',
      invalidDomain: 'Please enter email with @unitedexploration.co.in only.',
      notMatching: 'Confirm field value should match with Actual value.',
      passwordNotMatching: 'Confirm Password should match with Password.',
      accountNoNotMatching: 'Confirm account no should match with Account no.',
      userNameExists: 'This username is already registered.',
      invalidPAN: 'Please enter a valid PAN number.',
      minLengthArray: 'Please select at least one date from the calendar.',
      invalidAlphaNumericWithSpace: 'Please enter alpha numeric values with space & few allowed special characters.',
      invalidNumericTwoDecimal: 'Numeric upto two decimal is accepted.',
      invalidNumber: 'This field should be only integer number.',
      invalidName: 'Please enter name using valid characters.',
      noSpace: 'Consecutive spaces are not allowed.'
  };
  if(errorMessage[rule]) {
      return errorMessage[rule];
  } else {
      return 'Rule: ' + rule + ' : This field has a generic error.';
  }
  }

  validEmail(control: AbstractControl) {
    const valid = control?.value ? control?.value?.match(regEx.email) : true;
    return valid ? null : { 'validEmail': true };
  }

  phoneNumber(control: AbstractControl) {
    const valid = control?.value ? control?.value?.match(regEx.phone_number_US) : true;
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

  validName(control: AbstractControl) {
    const regex = new RegExp(regEx.name);
    const valid = regex.test(control.value);
    return valid ? null : { 'invalidName': true };
  }
  

  validEmailDomain(control: AbstractControl) {
    let error = null;
    if (control?.value && control?.value.indexOf("@") != -1) {
      let [_, domain] = control?.value.split("@");
      if (domain == "unitedexploration.co.in") {
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
      if(matchTo === 'password' || matchTo === 'confirmPassword') {
        return !!control.parent && !!control.parent.value && control.value === (control.parent?.controls as any)[matchTo].value ? null : { passwordNotMatching: true };
      }
      if(matchTo === 'accountNo' || matchTo === 'confirmAccountNo') {
        return !!control.parent && !!control.parent.value && control.value === (control.parent?.controls as any)[matchTo].value ? null : { accountNoNotMatching: true };
      }
      return !!control.parent && !!control.parent.value && control.value === (control.parent?.controls as any)[matchTo].value ? null : { notMatching: true };
    };
  }

  validPAN(control: AbstractControl) {
    const valid = control?.value ? control?.value?.match(regEx.pan_number) : true;
    return valid ? null : { 'invalidPAN': true };
  }

  minLengthArray(control: AbstractControl) {
   return control.value?.length > 0 ? null : { 'minLengthArray': true };
  }

  alphaNumericWithSpace(control: AbstractControl) {
    const regex = new RegExp(regEx.alphanumericWithSpaceAllowedChars);
    const valid = regex.test(control.value);
    return valid ? null : { 'invalidAlphaNumericWithSpace': true };
  }

  numericTwoDecimal(control: AbstractControl) {    
    const regex = new RegExp(regEx.numeric_two_decimal_places);
    const valid = regex.test(control.value);
    return valid ? null : { 'invalidNumericTwoDecimal': true };
  }

  numericOnly(control: AbstractControl) {    
    const regex = new RegExp(regEx.numeric_only);
    const valid = regex.test(control.value);
    return valid ? null : { 'invalidNumber': true };
  }

  noSpace(control: AbstractControl) {    
    const regex = new RegExp(regEx.consecutive_spaces);
    const valid = regex.test(control.value);
    return valid ? null : { 'noSpace': true };
  }

  required(control: AbstractControl) {
    const regex = new RegExp(regEx.consecutive_spaces);
    const valid = regex.test(control.value);
    return valid ? null : { 'required': true };
  }

}
