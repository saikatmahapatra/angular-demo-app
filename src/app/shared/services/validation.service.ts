import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ValidationService {

  constructor() { }

  getValidatorErrorMessage(ruleName: string, validatorValue?: any) {
    let errorMessage = {
      'required': 'The field is required',
      'minlength': 'The field must be at least ${validatorValue.requiredLength} characters long',
      'maxlength': 'The field cannot be more than ${validatorValue.requiredLength} characters long',
      'email_address': 'Please enter a valid email address',
      '10_digit_phone_number':'Please enter a 10 digit phone number',
      'valid_email': 'Please enter a valid email'
    };
    if(errorMessage[ruleName]){
      return errorMessage[ruleName];
    }else{
      return 'No error message found corresponding to rule <'+ruleName+'>';
    }
  }

  valid_email(control) {
    let inputValue = control.value;
    let has_error = true;

    if (inputValue.match(/^(?!.*([.])\1{1})([\w\.\-\+\<\>\{\}\=\`\|\?]+)@(?![.-])([a-zA-Z\d.-]+)\.([a-zA-Z.][a-zA-Z]{1,6})$/)) {
      has_error = false;
    } else {
      has_error = true;
    }
    //console.log("inputValue=" + inputValue+' Is Invalid ='+has_error);
    return { 'valid_email': has_error }; // should return true to display errors
  }

  phone_number(control) {
    let inputValue = control.value;
    let has_error = true;
    if (inputValue.match(/^\d{10}$/)) {
      has_error = false;
    } else {
      has_error = true;
    }
    return { '10_digit_phone_number': has_error }; // should return true to display errors
  }

  foo(control) {
    return { 'foo': true }; // should return true to display errors
  }
}
