import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-add-edit-basic-info',
  templateUrl: './add-edit-basic-info.component.html',
  styleUrls: ['./add-edit-basic-info.component.scss']
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
  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private router: Router) { }

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
    this.apiSvc.getUserData(userId).subscribe({
      next: (val: any) => {
        this.userData = val?.data?.user;
        if(this.userData[0]?.id) {
          this.patchFormValue(this.userData[0]);
        }
      },
      error: (err) => {
        this.alertSvc.error(err, false);
      },
      complete: () => { }
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'update',
      personalEmail: data?.user_email_secondary,
      personalPhone: data?.user_phone2,
      workPhone: data?.user_phone1,
      bloodGroup: data?.user_blood_group
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      if(this.myForm.get('id')?.value) {
        this.apiSvc.updateUserData(this.myForm.value).subscribe({
          next: (response: any) => {
            if(response.status == 'success') {
              this.alertSvc.success(response.message, true);
              this.myForm.reset();
              this.router.navigate(['user/profile']);
            }
          }, 
          error: (err) => {
            this.alertSvc.error(err?.error?.message);
            this.loading = false;
          },
          complete: ()=> {
            this.loading = false;
          }
        });
      }
    } else {
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
