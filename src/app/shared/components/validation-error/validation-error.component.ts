import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../services/index';
@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.css'],
  providers: [ValidationService]
})
export class ValidationErrorComponent implements OnInit {

  @Input() control: FormControl;

  constructor(private _validator: ValidationService) { }

  ngOnInit() {
  }

  get errorMessage() {
    for (const validation_rule in this.control.errors) {
      if (this.control.errors.hasOwnProperty(validation_rule)) {
        if ((this.control.touched || this.control.dirty) && this.control.errors[validation_rule] === true) {
          return this._validator.getValidatorErrorMessage(validation_rule, this.control.errors[validation_rule]);
        }
      }
    }
    return null;
  }

}
