import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { User } from '../../models';
import { AppService, GlobalDataService, ValidationService } from '../../services';

// https://code.tutsplus.com/tutorials/introduction-to-forms-in-angular-4-reactive-forms--cms-29787
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  providers: [GlobalDataService, ValidationService, AppService]
})
export class ReactiveFormComponent implements OnInit {
  cms: any = [];
  userData: User;
  selectedSkills = [];
  genders = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' }
  ];
  cities = [
    { name: 'Kolkata', value: 'kolkata' },
    { name: 'Delhi', value: 'delhi' },
    { name: 'Chennai', value: 'chennai' },
  ];
  skillsets = [
    { name: 'HTML', value: 'html' },
    { name: 'JavaScript', value: 'js' },
    { name: 'CSS', value: 'css' }
  ];
  signUpForm: FormGroup; // declare that signUpForm is type of FormGroup
  formSubmitted = false;

  // To use services, inject into constructor
  // To use Form Builder, inject formbuilder into constructor
  constructor(
    private appService: AppService,
    private globalDataService: GlobalDataService,
    private validator: ValidationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createAddUserForm();
  }

  createAddUserForm() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]),
      email: new FormControl('', [Validators.required, this.validator.valid_email]),
      phoneNumber: new FormControl('', [Validators.required, this.validator.phone_number]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      skills: new FormControl(),
      termsAccepted: new FormControl(false, [Validators.requiredTrue])
    });
  }

  addUser() {
    this.appService.log(this.signUpForm.value);
    this.userData = this.signUpForm.value;
  }

}
