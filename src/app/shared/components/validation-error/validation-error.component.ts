import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../core/services/validation.service';
@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  providers: [ValidationService]
})
export class ValidationErrorComponent implements OnInit {

  @Input()
  control!: AbstractControl;

  constructor(private validator: ValidationService) { }

  ngOnInit() {
  }

  // update form control value & validity



  
  //get err message
  get errorMessage() {
    for (const validationRule in this.control.errors) {
      if (this.control.errors.hasOwnProperty(validationRule)) {
        if ((this.control.touched || this.control.dirty) && this.control.errors[validationRule] === true) {
          return this.validator.getValidatorErrorMessage(validationRule, this.control.errors[validationRule]);
        }
      }
    }
    return null;
  }

}
