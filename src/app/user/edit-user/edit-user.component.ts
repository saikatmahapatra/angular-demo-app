import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, UntypedFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';
import { addressType, userStatus } from 'src/app/@utils/const/data.array';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
    standalone: false
})
export class EditUserComponent {
  userId: string | number | undefined;
  userInfo: any = [];
  addressInfo: any = [];
  workExp: any = [];
  payrollInfo: any = [];
  educationInfo: any = [];
  emergencyContact: any = [];
  approvers: any = [];
  leaveBalance: any = [];
  userGovtIds: any;
  userPhoto: any;
  submitted = false;
  loading = false;
  routedFromPageIndex = 0;
  navigationExtras: NavigationExtras = {};

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
    { name: 'Resignation/Released', id: 'D' },
  ];

  departmentList: any;
  employmentTypeList: any;
  designationList: any;
  workspaceSolutionList: any;
  baseWorkLocationList: any;

  minDateDob: Date = new Date();
  maxDateDob: Date = new Date();
  minDateDoj: Date = new Date();
  maxDateDoj: Date = new Date();
  DateOfRel!: Date;

  userBasicForm = this.fb.group({
    id: [null],
    action: ['editUser'],
    fullName: ['', [Validators.required, this.validator.notEmpty, Validators.minLength(3), Validators.maxLength(32), this.validator.validName]],
    workPhone: ['', [this.validator.phoneNumber]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    designation: ['', Validators.required],
    newDesignation: [null],
    department: ['', Validators.required],
    dateOfJoining: ['', Validators.required],
    employmentType: ['', Validators.required],
    role: ['3', Validators.required],
    workspaceSolution: ['', Validators.required],
    baseWorkLocation: ['', Validators.required],
  });

  isRequiredStatusChangeReason = true;
  isRequiredDateOfRelease = true;
  isRequiredAccountCloseComments = true;

  
  userStatusForm = this.fb.group({
    id: [null],
    action: ['editUserStatus'],
    accountStatus: ['', {
      validators: [
        Validators.required
      ],
      asyncValidators: [this.conditionalStatus]
    }],
    //statusChangeReason: [''],
    dateOfRelease: [null],
    //accountCloseComments: ['']
  });

  conditionalStatus(control: AbstractControl): Observable<ValidationErrors | null> {
    const accountStatus: string = control.value;
    //const statusChangeReason = control.parent?.get('statusChangeReason');
    const dateOfRelease = control.parent?.get('dateOfRelease');
    //const accountCloseComments = control.parent?.get('accountCloseComments');
    if (accountStatus === 'A') {
      // Emit an object with a validation error.
      //statusChangeReason?.setValidators([Validators.required]);
      dateOfRelease?.setValidators([Validators.required]);
      //accountCloseComments?.setValidators([Validators.required]);
    } else {
      //statusChangeReason?.clearValidators();
      dateOfRelease?.clearValidators();
      //accountCloseComments?.clearValidators();
    }
    //statusChangeReason?.updateValueAndValidity();
    dateOfRelease?.updateValueAndValidity();
    //accountCloseComments?.updateValueAndValidity();
    // Emit null, to indicate no error occurred.
    return of(null);
  }


  leaveBalanceForm = this.fb.group({
    id: [null],
    userId: [null],
    cl: [null, [Validators.required, Validators.max(30)]],
    sl: [null, [Validators.required, Validators.max(20)]],
    pl: [null, [Validators.required, Validators.max(100)]],
    ol: [null, [Validators.max(4)]],
    co: [null, [Validators.max(20)]]
  });

  constructor(
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private commonSvc: CommonService
  ) {
    let today = new Date();
    this.minDateDob.setFullYear(today.getFullYear() - 100);
    this.maxDateDob.setFullYear(today.getFullYear() - 18);

    //this.minDateDoj.setFullYear(today.getFullYear() - 100);
    this.maxDateDoj.setDate(today.getDate());
    this.commonSvc.setTitle('Edit Profile');
  }

  ngOnInit(): void {
    this.addNewDesignationValidator();
    this.routedFromPageIndex = history.state['manageUserPageIndex'] || 0;
    this.navigationExtras = {
      state: {manageUserPageIndex: this.routedFromPageIndex},
    };
    this.getUserData();
  }

  getUserData() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      let queryParams = new HttpParams();
      queryParams = queryParams.append('id', this.userId);
      queryParams = queryParams.append('pageName', 'viewEmpProfile');
      let options = {};
      options = { params: queryParams };

      let formDataAPI = this.apiSvc.get(CustomAppConfig.apiUrl.userFormData);
      let userDataAPI = this.apiSvc.get(CustomAppConfig.apiUrl.userDetails, options);

      forkJoin([formDataAPI, userDataAPI]).subscribe({
        next: (response: any) => {
          // To fill data in form
          this.designationList = response[0]?.data.designations;
          this.departmentList = response[0]?.data?.departments;
          this.employmentTypeList = response[0]?.data?.employmentTypes;
          this.workspaceSolutionList = response[0]?.data?.workspace_solution;
          this.baseWorkLocationList = response[0]?.data?.work_location;
          // User Data
          this.userInfo = response[1]?.data?.user[0];
          this.addressInfo = response[1]?.data?.address;
          this.workExp = response[1]?.data?.workExp;
          this.payrollInfo = response[1]?.data?.payrollInfo;
          this.educationInfo = response[1]?.data?.education;
          this.emergencyContact = response[1]?.data?.econtact;
          this.userGovtIds = response[1]?.data?.userGovtIds;
          this.userPhoto = response[1]?.data?.profilePic;
          this.leaveBalance = response[1]?.data?.leaveBalance?.data_rows[0] || [];
          this.patchUserBasicDefailsForm();
          this.patchUserAccountStatusDefailsForm();
          this.patchLeaveBalanceForm();
        },
        error: (response: HttpErrorResponse) => {
        }
      });
    });
  }

  patchUserBasicDefailsForm() {
    this.userBasicForm.patchValue({
      id: this.userInfo?.id,
      fullName: this.userInfo?.user_full_name,
      workPhone: this.userInfo?.user_phone2,
      dateOfBirth: new Date(this.userInfo?.user_dob),
      gender: this.userInfo?.user_gender,
      designation: this.userInfo?.user_designation,
      department: this.userInfo?.user_department,
      dateOfJoining: new Date(this.userInfo?.user_doj),
      employmentType: this.userInfo?.user_employment_type,
      role: this.userInfo?.user_role,
      accountStatus: this.userInfo?.user_status,
      workspaceSolution: this.userInfo?.user_workspace_solution_type,
      baseWorkLocation: this.userInfo?.user_work_base_location_id,
    });
  }

  patchUserAccountStatusDefailsForm() {
    this.userStatusForm.patchValue({
      id: this.userInfo?.id,
      accountStatus: this.userInfo?.user_status,
    });
  }

  patchLeaveBalanceForm() {
    this.leaveBalanceForm.patchValue({
      userId: this.userInfo?.id,
      id: this.leaveBalance?.id,
      cl: this.leaveBalance?.cl,
      pl: this.leaveBalance?.pl,
      sl: this.leaveBalance?.sl,
      ol: this.leaveBalance?.ol,
      co: this.leaveBalance?.co
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.userBasicForm.valid) {
      this.apiSvc.post(CustomAppConfig.apiUrl.updateUser, this.userBasicForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.setAlert('success', response.message, true);
          this.router.navigate(['/emp/view-emp-profile/', this.userId], this.navigationExtras);
          //window.location.reload();
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
      this.apiSvc.post(CustomAppConfig.apiUrl.updateUserStatus, this.userStatusForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.setAlert('success', response.message, true);
          this.router.navigate(['/emp/view-emp-profile/', this.userId], this.navigationExtras);
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


  saveLeaveBalance() {
    this.submitted = true;
    this.loading = true;
    if (this.leaveBalanceForm.valid) {
      this.apiSvc.post(CustomAppConfig.apiUrl.saveLeaveBalance, this.leaveBalanceForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.setAlert('success', response.message, true);
          this.router.navigate(['/emp/view-emp-profile/', this.userId], this.navigationExtras);
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
      this.validator.validateAllFormFields(this.leaveBalanceForm);
    }
  }

  addNewDesignationValidator() {
    const dep = this.userBasicForm.controls['designation'];
    const field = this.userBasicForm.controls['newDesignation'];
    dep?.valueChanges.subscribe((val) => {
      if (val === '-1') {
        field.setValidators([Validators.required]);
      } else {
        field.removeValidators([Validators.required]);
        field.setValue(null);
        field.setErrors(null);
      }
    });
    field.updateValueAndValidity();
  }


}
