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
      'phoneNumber':'Please enter a 10 digit phone number.',
      
    };
    if(errorMessage[ruleName]){
      return errorMessage[ruleName];
    }else{
      return 'No error message found corresponding to rule <'+ruleName+'>';
    }
  }

  validEmail(control: { value: any; }) {
    let inputValue = control.value;
    let hasError = true;

    if (inputValue.match(/^(?!.*([.])\1{1})([\w\.\-\+\<\>\{\}\=\`\|\?]+)@(?![.-])([a-zA-Z\d.-]+)\.([a-zA-Z.][a-zA-Z]{1,6})$/)) {
      hasError = false;
    } else {
      hasError = true;
    }
    return { 'validEmail': hasError };
  }

  phoneNumber(control: { value: any; }) {
    let inputValue = control.value;
    let hasError = true;
    if (inputValue.match(/^\d{10}$/)) {
      hasError = false;
    } else {
      hasError = true;
    }
    return { 'phoneNumber': hasError };
  }

  foo(control: any) {
    return { 'foo': true }; // should return true to display errors
  }
}
