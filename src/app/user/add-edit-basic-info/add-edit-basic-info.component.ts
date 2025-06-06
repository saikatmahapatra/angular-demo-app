import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';
@Component({
    selector: 'app-add-edit-basic-info',
    templateUrl: './add-edit-basic-info.component.html',
    styleUrls: ['./add-edit-basic-info.component.scss'],
    standalone: false
})
export class AddEditBasicInfoComponent implements OnInit {
  submitted = false;
  loading = false;
  userData: any = [];
  bloodGroupList = [
    { "id": "A+", "name": "A+" },
    { "id": "A-", "name": "A-" },
    { "id": "B+", "name": "B+" },
    { "id": "B-", "name": "B-" },
    { "id": "AB+", "name": "AB+" },
    { "id": "AB-", "name": "AB-" },
    { "id": "O+", "name": "O+" },
    { "id": "O-", "name": "O-" },
    { "id": "Unknown", "name": "Unknown" }
  ]
  constructor(private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private commonSvc: CommonService,
    private router: Router) { 
      this.commonSvc.setTitle('Basic Info');
    }

  ngOnInit(): void {
    this.getUserData('');
  }


  myForm = this.fb.group({
    id: [null],
    action: ['edit'],
    personalEmail: ['', [Validators.required, this.validator.validEmail]],
    personalPhone: ['', [Validators.required, this.validator.phoneNumber]],
    workPhone: ['', [this.validator.phoneNumber]],
    bloodGroup: ['']
  });

  getUserData(userId: string) {
    let queryParams = new HttpParams();
    if(userId) {
      queryParams = queryParams.append('id', userId);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(CustomAppConfig.apiUrl.userData, options).subscribe((val: any) => {
      this.userData = val?.data?.user;
      if (this.userData[0]?.id) {
        this.patchFormValue(this.userData[0]);
      }
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'update',
      personalEmail: data?.user_email2,
      personalPhone: data?.user_phone,
      workPhone: data?.user_phone2,
      bloodGroup: data?.user_blood_group
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.myForm.get('id')?.value) {
        this.apiSvc.patch(CustomAppConfig.apiUrl.updateUserData, this.myForm.value).subscribe((response: any) => {
          if (response.status == 'success') {
            this.alertSvc.setAlert('success', response.message, true);
            this.myForm.reset();
            this.router.navigate(['emp/my-profile']);
          }
        });
      }
    } else {
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
