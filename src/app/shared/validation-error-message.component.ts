import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from './services/index';
@Component({
  selector: 'validation-error-message',
  template: '<div class="text-danger" *ngIf="errorMessage !== null">{{errorMessage}}</div>',
  styleUrls: [],
  providers:[ValidationService]
})
export class ValidationErrorMessageComponent {

  @Input() control: FormControl; // Receive control from the parent (form html file)
  constructor(private _vs : ValidationService) { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      //console.log(this.control.value+' => '+this.control.errors)
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched && this.control.errors[propertyName] == true) {
        return this._vs.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
