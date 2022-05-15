export function getErrorMessage(rule: any, value?: any){
    const errorMessage: any = {
        required: 'The field is required.',
        minlength: `The field must be at least ${value?.requiredLength} characters long.`,
        maxlength: `The field cannot be more than ${value?.requiredLength} characters long.`,
        email: 'Please enter a valid email address.',
        validEmail: 'Please enter a valid email address i.e yourname@domain.com.',
        phoneNumber: 'Please enter a 10 digit phone number.',
        ruleOne: 'error message 1',
        ruleTwo: 'error message 2',
        ruleThreec: 'error message 3',
        invalidPassword: 'Password must be 8 chars long including at least one lower case letter, one uppercase letter, one number',
        invalidDomain: 'Please enter email with @gmail.com only',
        matching: 'Password must match',
        userNameExists: 'This username is already registered'
    };
    if(errorMessage[rule]) {
        return errorMessage[rule];
    } else {
        return 'Rule: ' + rule + ' : This field has a generic error.';
    }
}