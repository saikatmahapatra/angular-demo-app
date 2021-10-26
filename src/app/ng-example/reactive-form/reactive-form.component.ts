import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { User } from '../../models';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';
import { ValidationService } from '../../services/validation.service';
import * as _ from 'lodash';
// https://code.tutsplus.com/tutorials/introduction-to-forms-in-angular-4-reactive-forms--cms-29787
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  providers: [ApiService, ValidationService, CommonService]
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
  skillsets: any = [
    { name: 'HTML', value: 'html' },
    { name: 'JavaScript', value: 'js', selected: true },
    { name: 'Python', value: 'python', selected: true },
    { name: 'PHP', value: 'php', selected: false },
    { name: 'MySQL', value: 'mysql'},
    { name: 'CSS', value: 'css' }
  ];
  signUpForm: FormGroup; // declare that signUpForm is type of FormGroup
  formSubmitted = false;

  // To use services, inject into constructor
  // To use Form Builder, inject formbuilder into constructor
  constructor(
    private commonSvc: CommonService,
    private apiSvc: ApiService,
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
      skills: this.createFormArraySkills(this.skillsets),
      termsAccepted: new FormControl(false, [Validators.requiredTrue])
    });
    this.onCBChange();
  }

  createFormArraySkills(dataArray) {
    const arr = dataArray.map(item => {
      return new FormControl(item.selected || false);
    });
    return new FormArray(arr);
  }

  onCBChange() {
    this.selectedSkills = _.map(
      this.signUpForm.controls.skills['controls'],
      (skill, i) => {
        return skill.value && this.skillsets[i].value;
      }
    );
    this.getSelectedSkillsName();
  }

  getSelectedSkillsName() {
    this.selectedSkills = _.filter(
      this.selectedSkills,
      (skill) => {
        if (skill !== false) {
          return skill;
        }
      }
    );
  }

  addUser() {
    this.commonSvc.log(this.signUpForm.value);
    this.userData = this.signUpForm.value;
  }

}
