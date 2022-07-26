import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { FormValidationService } from '../../../@core/services/form-validation.service';
@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  providers: [FormValidationService]
})
export class ValidationErrorComponent implements OnInit {

  @Input()
  control!: AbstractControl;

  constructor(private formValidationSvc: FormValidationService) { }

  ngOnInit() {
  }

  // update form control value & validity

  //get err message
  get errorMessage() {
    const fG = this.control.parent;
    for (const validationRule in this.control.errors) {
      if (this.control.errors.hasOwnProperty(validationRule)) {
        if ((this.control.touched) && this.control.errors[validationRule]) {
          return this.formValidationSvc.getValidatorErrorMessage(validationRule, this.control.errors[validationRule]);
        }
      }
    }
    return null;
  }

}
