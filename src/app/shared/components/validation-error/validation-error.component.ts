import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { FormValidationService } from '../../../core/services/form-validation.service';
@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  providers: [FormValidationService]
})
export class ValidationErrorComponent implements OnInit {

  @Input()
  control!: AbstractControl;

  @Input() submitted: any;

  constructor(private formValidationSvc: FormValidationService) { }

  ngOnInit() {
  }

  // update form control value & validity



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
  
  //get err message
  get errorMessage() {
    const fG = this.control.parent;
    for (const validationRule in this.control.errors) {
      if (this.control.errors.hasOwnProperty(validationRule)) {
        if ((this.submitted || this.control.touched) && this.control.errors[validationRule]) {
          return this.formValidationSvc.getValidatorErrorMessage(validationRule, this.control.errors[validationRule]);
        }
      }
    }
    return null;
  }

}
