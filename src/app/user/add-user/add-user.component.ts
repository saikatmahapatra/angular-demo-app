import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { min } from 'lodash';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  submitted = false;
  loading = false;

  DataGender: Array<any> = [
    { name: 'Male', id: 'M' },
    { name: 'Female', id: 'F' }
  ];

  userRole: Array<any> = [
    { name: 'User', id: '3' },
    { name: 'Administrator', id: '1' }
  ];

  departmentList: any;
  employmentTypeList: any;
  designationList: any;

  minDateDob: Date = new Date();
  maxDateDob: Date = new Date();
  minDateDoj: Date = new Date();
  maxDateDoj: Date = new Date();

  myForm = this.fb.group({
    id: [null],
    action: ['createUser'],
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    workEmail: ['', [Validators.required, this.validator.validEmail, this.validator.validEmailDomain]],
    workPhone: ['', [this.validator.phoneNumber]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    personalEmail: ['', [this.validator.validEmail]],
    personalPhone: ['', [Validators.required, this.validator.phoneNumber]],
    designation: ['', Validators.required],
    department: ['', Validators.required],
    dateOfJoining: ['', Validators.required],
    employmentType: ['', Validators.required],
    role: ['3', Validators.required]
  });

  constructor(private fb: UntypedFormBuilder, private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService) {
    this.getFormData();

    let today = new Date();
    this.minDateDob.setFullYear(today.getFullYear() - 100);
    this.maxDateDob.setFullYear(today.getFullYear() - 18);

    //this.minDateDoj.setFullYear(today.getFullYear() - 100);
    this.maxDateDoj.setDate(today.getDate());

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid) {
      this.apiSvc.post(AppConfig.apiUrl.addUser, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message);
            this.myForm.reset();
            this.loading = false;
          }
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.userFormData).subscribe((val: any) => {
      this.designationList = val?.data.designations;
      this.departmentList = val?.data?.departments,
        this.employmentTypeList = val?.data?.employmentTypes
    });
  }

}
