import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ValidationService {
  
  constructor() { }

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'The field is required',
      'email_address': 'Please enter a valid email address',
      '10_digit_phone_number':'Please enter a 10 digit phone number',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };
    return config[validatorName];
  }

  email_address(control) {
    let inputValue = control.value;
    let has_error = true;
    
    if (inputValue.match(/^(?!.*([.])\1{1})([\w\.\-\+\<\>\{\}\=\`\|\?]+)@(?![.-])([a-zA-Z\d.-]+)\.([a-zA-Z.][a-zA-Z]{1,6})$/)) {
      has_error = false;
    } else {
      has_error = true;
    }
    //console.log("inputValue=" + inputValue+' Is Invalid ='+has_error);
    return { 'email_address': has_error }; // should return true to display errors
  }

  phone_number(control) {
    let inputValue = control.value;
    let has_error = true;
    //console.log("inputValue=" + inputValue);
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
