import { AbstractControl,
  ValidationErrors,
  Validators,
  ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ValidationMethod,
  ValidationMethods,
  ValidationRegExps,
  ValidatorConfiguration } from 'app/models';


const specialCharacters = '\u0152\u0153\u20A0\u20A3\u0178\u20AC\u2013\u2014\u00C6\u00E6\u00C4\u00E4\u20A3';
const shiftCharacters = '\u00C0-\u00FF\~\#\";\/!@$%^&*()_\+\{\}\?\-\[\]\\,.';
const alphaNumeric = '0-9\sA-Za-z';


/**
* Private collection of regular expressions to be used when validating Form
* Control instances
*/
const lib: ValidationRegExps = {

alpha: /^[a-zA-Z \-\']*$/,

amount: /^(\d+(\.\d{1,2})?)?$/,

creditCardSecurityCode: /^([0-9]{3,4})*$/,

numbers: /^\d*$/,

password: /^(?=\S)[^|]{6,32}$/,

userId: new RegExp(`${alphaNumeric}${shiftCharacters}${specialCharacters}`),

zipcode: /^([\d|\*]{5}(?:[-\s][\d|\*]{4})?)?$/,

numberMask: /^[\d|\*]*$/

};

@Injectable({
providedIn: 'root'
})
export class ValidatorService {

/**
* The Validator Service validates user input against its library of
* validation methods.
*/
constructor() { }

/**
* Private collection of validation methods
*/
private validators: ValidationMethods = {

alpha: function(control): boolean {
const validator: ValidatorFn = Validators.pattern(lib.alpha);
const errors: ValidationErrors = validator(control);
return !errors;
},

amount: function(control): boolean {
const validator: ValidatorFn = Validators.pattern(lib.amount);
const errors: ValidationErrors = validator(control);
return !errors;
},

creditCardSecurityCode: function(control): boolean {
const validator: ValidatorFn = Validators.pattern(lib.creditCardSecurityCode);
const errors: ValidationErrors = validator(control);
return !errors;
},

checked: function(control): boolean {
const validator: ValidatorFn = Validators.pattern('true');
const errors: ValidationErrors = validator(control);
return !errors;
},

email: function(control): boolean {
const validator: ValidatorFn = Validators.email;
const errors: ValidationErrors = validator(control);
return !errors;
},

maxLength: function(control, maxLength: number): boolean {
const validator: ValidatorFn = Validators.maxLength(maxLength);
const errors: ValidationErrors = validator(control);
return !errors;
},

minLength: function(control, minLength: number): boolean {
const validator: ValidatorFn = Validators.minLength(minLength);
const errors: ValidationErrors = validator(control);
return !errors;
},

numbers: function(control): boolean {
const validator: ValidatorFn = Validators.pattern(lib.numbers);
const errors: ValidationErrors = validator(control);
return !errors;
},

password: function(control): boolean {
const validator: ValidatorFn = Validators.pattern(lib.password);
const errors: ValidationErrors = validator(control);
return !errors;
},

userId: function(control): boolean {
const validator: ValidatorFn = Validators.pattern(lib.userId);
const errors: ValidationErrors = validator(control);
return !errors;
},


required: function(control): boolean {
const errors: ValidationErrors = Validators.required(control);
return !errors;
},

static: function(control, value: string, valid: boolean): boolean {
return valid ? true : !(value === control.value);
},

zipcode: function(control): boolean {
const validator: ValidatorFn = Validators.pattern(lib.zipcode);
const errors: ValidationErrors = validator(control);
return !errors;
},

numberMask: function(control): boolean {
 const validator: ValidatorFn = Validators.pattern(lib.numberMask);
 const errors: ValidationErrors = validator(control);
 return !errors;
}

};
/**
* Public method for returning an Angular Validation Fn instance from a
* validator configuration object
*/
validate(config: ValidatorConfiguration): ValidatorFn {
const { name, message } = config;
const args = Array.isArray(config.args) ? [ ...config.args ] : [];
return (control: AbstractControl): ValidationErrors => {
let valid: boolean;
if (!this.validators[name]) {
 const errorMsg = `The validator ${name} is not a validator that has been
                   added to the validator service. Check the validators
                   in validator.service.ts to see the available
                   validators.`;
 throw new Error(errorMsg);
}
valid = this.validators[name].apply(this, [ control, ...args ]);
return (!valid) ? { [name]: message } : null;
};
}

}
