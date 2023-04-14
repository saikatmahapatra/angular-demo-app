import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { addressType, userStatus } from 'src/app/@utils/const/data.array';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  userInfo: any;
  addressInfo: any = [];
  workExp: any = [];
  payrollInfo: any = [];
  educationInfo: any = [];
  emergencyContact: any = [];
  approvers: any = [];
  userGovtIds: any;
  userPhoto: any;
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

  constructor(
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService
  ) {
    this.getProfileData();
  }

  ngOnInit(): void {

  }

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.userFormData).subscribe((val: any) => {
      this.designationList = val?.data.designations;
      this.departmentList = val?.data?.departments,
        this.employmentTypeList = val?.data?.employmentTypes
    });
  }

  getProfileData() {
    let userId = null;
    this.activatedRoute.paramMap.subscribe(params => {
      //console.log('params =', params);
      userId = params.get('id');
      this.getProfile(userId);
    })
  }

  getProfile(id?: any) {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append('id', id);
    }
    queryParams = queryParams.append('pageName', 'viewEmpProfile');
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.userDetails, options).subscribe((response: any) => {
      if (response.status == 'success') {
        //console.log(response?.data);
        this.userInfo = response?.data?.user[0];
        this.addressInfo = response?.data?.address;
        this.workExp = response?.data?.workExp;
        this.payrollInfo = response?.data?.payrollInfo;
        this.educationInfo = response?.data?.education;
        this.emergencyContact = response?.data?.econtact;
        this.userGovtIds = response?.data?.userGovtIds;
        this.userPhoto = response?.data?.profilePic;
      }
    });
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
}
