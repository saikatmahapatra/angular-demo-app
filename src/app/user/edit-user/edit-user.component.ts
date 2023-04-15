import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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
  userStatus = '';

  DataGender: Array<any> = [
    { name: 'Male', id: 'M' },
    { name: 'Female', id: 'F' }
  ];

  userRole: Array<any> = [
    { name: 'User', id: '3' },
    { name: 'Administrator', id: '1' }
  ];

  accountStatus: Array<any> = [
    { name: 'Active', id: 'Y' },
    { name: 'Inactive', id: 'N' },
    { name: 'Close Account Permanently', id: 'A' },
  ];

  accountStatusReason: Array<any> = [
    { name: 'First-time User/New User', id: 'N' },
    { name: 'Block Temporary', id: 'B' },
    { name: 'Resigned/Released/No Longer Employed', id: 'D' },
  ];

  departmentList: any;
  employmentTypeList: any;
  designationList: any;

  minDateDob: Date = new Date();
  maxDateDob: Date = new Date();
  minDateDoj: Date = new Date();
  maxDateDoj: Date = new Date();
  DateOfRel!: Date;

  userBasicForm = this.fb.group({
    id: [null],
    action: ['editUser'],
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    workEmail: [''],
    workPhone: ['', [this.validator.phoneNumber]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    designation: ['', Validators.required],
    department: ['', Validators.required],
    dateOfJoining: ['', Validators.required],
    employmentType: ['', Validators.required],
    role: ['3', Validators.required]
  });

  userStatusForm = this.fb.group({
    id: [null],
    action: ['editUser'],
    accountStatus: ['', Validators.required],
    statusChangeReason: [''],
    dateOfRelease: [null],
    accountCloseComments: ['']
  });

  isRequiredStatusChangeReason = false;
  isRequiredDateOfRelease = false;
  isRequiredAccountCloseComments = false;

  constructor(
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService
  ) {
    let today = new Date();
    this.minDateDob.setFullYear(today.getFullYear() - 100);
    this.maxDateDob.setFullYear(today.getFullYear() - 18);

    //this.minDateDoj.setFullYear(today.getFullYear() - 100);
    this.maxDateDoj.setDate(today.getDate());
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.activatedRoute.paramMap.subscribe(params => {
      let userId = params.get('id') || '';
      let queryParams = new HttpParams();
      queryParams = queryParams.append('id', userId);
      queryParams = queryParams.append('pageName', 'viewEmpProfile');
      let options = {};
      options = { params: queryParams };

      let formDataAPI = this.apiSvc.get(AppConfig.apiUrl.userFormData);
      let userDataAPI = this.apiSvc.get(AppConfig.apiUrl.userDetails, options);

      forkJoin([formDataAPI, userDataAPI]).subscribe({
        next: (response: any) => {
          // To fill data in form
          this.designationList = response[0]?.data.designations;
          this.departmentList = response[0]?.data?.departments;
          this.employmentTypeList = response[0]?.data?.employmentTypes;
          // User Data
          this.userInfo = response[1]?.data?.user[0];
          this.addressInfo = response[1]?.data?.address;
          this.workExp = response[1]?.data?.workExp;
          this.payrollInfo = response[1]?.data?.payrollInfo;
          this.educationInfo = response[1]?.data?.education;
          this.emergencyContact = response[1]?.data?.econtact;
          this.userGovtIds = response[1]?.data?.userGovtIds;
          this.userPhoto = response[1]?.data?.profilePic;
          this.patchUserBasicDefailsForm();
          this.patchUserAccountStatusDefailsForm();
          this.userStatus = this.userInfo.user_status || '';
        },
        error: (response: HttpErrorResponse) => {
        }
      });
    });
  }

  patchUserBasicDefailsForm() {
    this.userBasicForm.patchValue({
      id: this.userInfo?.id,
      firstName: this.userInfo?.user_firstname,
      lastName: this.userInfo?.user_lastname,
      workEmail: this.userInfo?.user_email,
      workPhone: this.userInfo?.user_phone2,
      dateOfBirth: new Date(this.userInfo?.user_dob),
      gender: this.userInfo?.user_gender,
      designation: this.userInfo?.user_designation,
      department: this.userInfo?.user_department,
      dateOfJoining: new Date(this.userInfo?.user_doj),
      employmentType: this.userInfo?.user_employment_type,
      role: this.userInfo?.user_role,
      accountStatus: this.userInfo?.user_status,
    });
  }

  patchUserAccountStatusDefailsForm() {
    this.userStatusForm.patchValue({
      id: this.userInfo?.id,
      accountStatus: this.userInfo?.user_status,
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.userBasicForm.valid) {
      this.apiSvc.post(AppConfig.apiUrl.updateUser, this.userBasicForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message, true);
          this.router.navigate(['/emp/manage'])
          this.loading = false;
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
      this.validator.validateAllFormFields(this.userBasicForm);
    }
  }

  onSubmitUserStatus() {
    this.submitted = true;
    this.loading = true;
    if (this.userStatusForm.valid) {
      this.apiSvc.post(AppConfig.apiUrl.updateUserStatus, this.userBasicForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message, true);
          this.router.navigate(['/emp/manage']);
          this.loading = false;
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
      this.validator.validateAllFormFields(this.userStatusForm);
    }
  }
}
