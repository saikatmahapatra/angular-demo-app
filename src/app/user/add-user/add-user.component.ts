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
    { name: 'Male', id: 'M' },
    { name: 'Female', id: 'F' }
  ];

  designationList: Array<any> = [
    { name: 'Select', id: '' },
    { name: 'Engineer', id: '1' }
  ];

  departmentList: Array<any> = [
    { name: 'Select', id: '' },
    { name: 'Physics', id: '1' }
  ];

  employmentTypeList: Array<any> = [
    { name: 'Select', id: '' },
    { name: 'FTE', id: '2' }
  ];

  constructor(private fb: FormBuilder, private validator: FormValidationService) { }

  ngOnInit(): void {
  }

  myForm = this.fb.group({
    id: [null],
    action: ['createUser'],
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
