import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  DataGender: Array<any> = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' }
  ];

  designationList: Array<any> = [
    { name: 'Select', value: '' },
    { name: '1', value: 'Engineer' }
  ];

  departmentList: Array<any> = [
    { name: 'Select', value: '' },
    { name: '1', value: 'Dep1' }
  ];

  employmentTypeList: Array<any> = [
    { name: 'Select', value: '' },
    { name: '1', value: 'Full Time' }
  ];

  constructor(private fb: FormBuilder, private validator: FormValidationService) { }

  ngOnInit(): void {
  }

  myForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    workEmail: ['', [Validators.required, this.validator.validEmail]],
    workPhone: ['', [this.validator.phoneNumber]],
    dateOfBirth: ['', Validators.required],
    gender: ['', [Validators.required]],
    personalEmail: ['', [this.validator.validEmail]],
    personalPhone: ['', [Validators.required, this.validator.phoneNumber]],
    designation: ['', Validators.required],
    department: ['', Validators.required],
    dateOfJoining: ['', Validators.required],
    employmentType: ['', Validators.required]
  });

  onSubmit() {
    console.log('onSubmit===', this.myForm);
    if (this.myForm.valid) {
      console.log('form submitted', this.myForm.value);
    } else {
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
