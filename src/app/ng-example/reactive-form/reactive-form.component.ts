import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { User } from 'app/models'; // Import the user class for form example
import { AppService, GlobalDataService, ValidationService } from 'app/services/index';

// https://code.tutsplus.com/tutorials/introduction-to-forms-in-angular-4-reactive-forms--cms-29787
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  providers: [GlobalDataService]
})
export class ReactiveFormComponent implements OnInit {
  cms: any = [];
  userData: User; // userData is a type of User
  selectedSkills = [];
  genders = [{ 'name': 'Male', 'value': 'M' }, { 'name': 'Female', 'value': 'F' }];
  cities = [{ 'name': 'Kolkata', 'value': 'CCU' }, { 'name': 'Delhi', 'value': 'DEL' }, { 'name': 'Chennai', 'value': 'CHN' }];
  skillsets = [{ 'name': 'HTML', 'value': 'html' }, { 'name': 'JavaScript', 'value': 'js' }, { 'name': 'CSS', 'value': 'css' }];
  formAddUser: FormGroup; // declare that formAddUser is type of FormGroup
  formSubmitted = false;

  // To use services, inject into constructor
  // To use Form Builder, inject formbuilder into constructor
  constructor(
    private _appService: AppService,
    private _globalDataService: GlobalDataService,
    private _validator: ValidationService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createAddUserForm();
  }

  createAddUserForm() {
    // Using formbuilder
    // this.formAddUser = this._fb.group({
    //   firstName: ['Saikat', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    //   lastName: ['Mahapatra', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    //   email: ['saikat@gmail.com', [Validators.required, this._validator.email_address]],
    //   phoneNumber: ['9830098300', [Validators.required, this._validator.phone_number]],
    //   password: ['',[Validators.required]],
    //   confirmPassword: ['', [Validators.required]],
    //   city: [''],
    //   gender: ['', [Validators.required]],
    //   skills: [''],
    //   termsAccepted: [false, [Validators.requiredTrue]]
    // });

    this.formAddUser = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]),
      'email': new FormControl('', [Validators.required, this._validator.valid_email]),
      'phoneNumber': new FormControl('', [Validators.required, this._validator.phone_number]),
      'password': new FormControl('', [Validators.required]),
      'confirmPassword': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'gender': new FormControl('', [Validators.required]),
      'skills': new FormControl(),
      'termsAccepted': new FormControl(false, [Validators.requiredTrue])
    });
  }

  addUser() {
    this._appService.log(this.formAddUser.value);
    this.userData = this.formAddUser.value;
  }

}
