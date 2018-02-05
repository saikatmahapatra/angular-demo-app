import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ValidationService } from '../../../services/validation.service';
import { CreditCustomer } from '../../../shared/class/user'; // Import the user class for form example
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

//https://code.tutsplus.com/tutorials/introduction-to-forms-in-angular-4-reactive-forms--cms-29787
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  providers: [ContentService, ValidationService]
})
export class ReactiveFormComponent implements OnInit {
  private cms: any[];
  private genderList: any[];
  private errMsg = [];
  private user: CreditCustomer;
  signupForm: FormGroup; // Declare signup form

  // To use services, inject into constructor
  // To use Form Builder, inject formbuilder into constructor
  constructor(private _contentService: ContentService, private _validator: ValidationService, private fb: FormBuilder) { }

  ngOnInit() {

    this.cms = this._contentService.getCMSContent();
    this.genderList = this.cms[0].gender;
    this.errMsg = this.cms[0].error;


    // Using formgroup, formcontrol
    /*this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      createPassword: new FormGroup({
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required)
      }),
      gender: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.requiredTrue)
    });*/

    // Using formbuilder
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, this._validator.email]],
      createPassword: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }),
      gender: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  onFormSubmit() {
    if (this.signupForm.valid) {
      console.log("Sign Up Form Validated");
      this.user = this.signupForm.value;
      console.log(this.user);
    }
  }

}
