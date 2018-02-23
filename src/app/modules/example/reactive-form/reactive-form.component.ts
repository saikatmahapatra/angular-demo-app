import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../shared/services/content.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { CreditCustomer } from '../../../shared/class/user'; // Import the user class for form example
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoggerService } from '../../../shared/services/logger.service';
//https://code.tutsplus.com/tutorials/introduction-to-forms-in-angular-4-reactive-forms--cms-29787
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  providers: [ContentService, ValidationService]
})
export class ReactiveFormComponent implements OnInit {
  private cms: any = [];
  private genderList: any[];
  private allSkills: any[];
  private errMsg = [];
  private user: CreditCustomer;
  signupForm: FormGroup; // Declare signup form

  // To use services, inject into constructor
  // To use Form Builder, inject formbuilder into constructor
  constructor(private _logger: LoggerService, private _contentService: ContentService, private _validator: ValidationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getContents();
    //this.createSignupFormX();
    this.createSignupForm();
  }


  getContents() {
    this._contentService.getCMSContent().subscribe(data => {
      this.cms = data;
      this.genderList = this.cms[0].gender;
      this.errMsg = this.cms[0].error;
      this.allSkills = this.cms[0].skills;
    });
  }

  // createSignupFormX() {
  //   // Using formgroup, formcontrol
  //   this.signupForm = new FormGroup({
  //     email: new FormControl('', Validators.required),
  //     createPassword: new FormGroup({
  //       password: new FormControl('', Validators.required),
  //       confirmPassword: new FormControl('', Validators.required)
  //     }),
  //     gender: new FormControl('', Validators.required),
  //     terms: new FormControl(false, Validators.requiredTrue)
  //   });
  // }

  createSignupForm() {
    // Using formbuilder
    this.signupForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]]
      }),
      email: ['', [Validators.required, this._validator.email]],
      phoneNumber: ['', [Validators.required, this._validator.phone_number]],
      createPassword: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }),
      gender: ['', [Validators.required]],
      jobExp: this.fb.group({
        experience: ['', [Validators.required]],
        //skill: this.fb.array([])
      }),
      terms: [false, [Validators.requiredTrue]]
    });
  }

  onFormSubmit() {
    if (this.signupForm.valid) {
      this._logger.log("Sign Up Form Validated");
      this.user = this.signupForm.value;
      this._logger.log(this.user);
    }
  }

}
