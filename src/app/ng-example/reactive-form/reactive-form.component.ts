import { Component, OnInit } from '@angular/core';
import { SignUpDataModel } from '../../shared/models/index'; // Import the user class for form example
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ContentService, LoggerService, ValidationService } from '../../shared/services/index';
//https://code.tutsplus.com/tutorials/introduction-to-forms-in-angular-4-reactive-forms--cms-29787
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  providers: [ContentService]
})
export class ReactiveFormComponent implements OnInit {
  private cms: any = [];
  private genderList: any = [];
  private skills: any = [];
  private user: SignUpDataModel;
  signupForm: FormGroup; // Declare signup form

  // To use services, inject into constructor
  // To use Form Builder, inject formbuilder into constructor
  constructor(
    private _logger: LoggerService,
    private _contentService: ContentService,
    private _validationService: ValidationService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.genderList = [{ "val": "m", "txt": "Male" }, { "val": "f", "txt": "Female" }];
    this.skills = ['Angular', 'HTML', 'CSS'];
    this.createSignupForm();
  }

  createSignupForm() {
    // Using formbuilder
    this.signupForm = this._formBuilder.group({
      name: this._formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]]
      }),
      email: ['', [Validators.required, this._validationService.email_address]],
      phoneNumber: ['', [Validators.required, this._validationService.phone_number]],
      createPassword: this._formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }),
      gender: ['', [Validators.required]],
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
