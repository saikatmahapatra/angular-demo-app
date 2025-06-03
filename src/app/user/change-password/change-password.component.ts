import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';
@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    standalone: false
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  loading = false;

  myForm = this.fb.group({
    action: ['changePassword'],
    currentPassword: [null, [Validators.required, this.validator.notEmpty]],
    password: [null, [Validators.required, this.validator.notEmpty, this.validator.strongPassword, this.validator.matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, this.validator.notEmpty, this.validator.matchValidator('password')]]
  });

  constructor(private fb: UntypedFormBuilder,
    private commonSvc: CommonService,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService) { 
      this.commonSvc.setTitle('Change Password');
    }

  ngOnInit(): void {

  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.myForm.valid) {
      this.apiSvc.post(CustomAppConfig.apiUrl.changePassword, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.setAlert('success', response.message);
            this.myForm.reset();
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
