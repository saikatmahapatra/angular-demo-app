import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, AbstractControl } from '@angular/forms';
@Injectable()
export class ValidationService {

  constructor() { }

  getValidatorErrorMessage(ruleName: string, validatorValue?: any) {
    let errorMessage: any = {
      'required': 'The field is required.',
      'minLength': `The field must be at least ${validatorValue.requiredLength} characters long.`,
      'maxLength': `The field cannot be more than ${validatorValue.requiredLength} characters long.`,
      'email': 'Please enter a valid email address.',
      'validEmail': 'Please enter a valid email address i.e yourname@domain.com.',
      'phoneNumber': 'Please enter a 10 digit phone number.',
      'ruleOne': 'error message 1',
      'ruleTwo': 'error message 2',
      'ruleThree': 'error message 3'
    };
    if (errorMessage[ruleName]) {
      return errorMessage[ruleName];
    } else {
      return 'No error message found corresponding to rule <' + ruleName + '>';
    }
  }

  validEmail(control: AbstractControl) {
    let error: any = null;
    if (control?.value?.match(/^(?!.*([.])\1{1})([\w\.\-\+\<\>\{\}\=\`\|\?]+)@(?![.-])([a-zA-Z\d.-]+)\.([a-zA-Z.][a-zA-Z]{1,6})$/)) {
      error = null;
    } else {
      error = { 'validEmail': true };
    }
    return error;
  }

  phoneNumber(control: AbstractControl) {
    let error: any = null;
    if (control?.value?.match(/^\d{10}$/)) {
      error = null;
    } else {
      error = { 'phoneNumber': true };
    }
    return error;
  }

  test1(control: AbstractControl) {
    let error: any = null;
    if (control?.value == 'one') {
      error = { 'ruleOne': true };
    } else {
      error = null;
    }
    return error;
  }

  test2(control: AbstractControl) {
    let error: any = null;
    if (control?.value == 'two') {
      error = { 'ruleTwo': true };
    } else {
      error = null;
    }
    return error;
  }

  test3(control: AbstractControl) {
    let error: any = null;
    if (control?.value == 'three') {
      error = { 'ruleThree': true };
    } else {
      error = null;
    }
    return error;
  }

}
