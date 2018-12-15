import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { User } from '../../shared/models/index'; // Import the user class for form example
import { ContentService, LoggerService, ValidationService } from '../../shared/services/index';
// https://code.tutsplus.com/tutorials/introduction-to-forms-in-angular-4-reactive-forms--cms-29787
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  providers: [ContentService]
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
    private _logger: LoggerService,
    private _contentService: ContentService,
    private _validationService: ValidationService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {

    this.createAddUserForm();
  }

  createAddUserForm() {
    // Using formbuilder
    this.formAddUser = this._fb.group({
      firstName: ['Saikat', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      lastName: ['Mahapatra', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      email: ['saikat@gmail.com', [Validators.required, this._validationService.email_address]],
      phoneNumber: ['9830098300', [Validators.required, this._validationService.phone_number]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      city: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      skills: [''],
      termsAccepted: [false, [Validators.requiredTrue]]
    });
  }

  addUser() {
    this._logger.log(this.formAddUser.value);
    this.userData = this.formAddUser.value;
  }

}
