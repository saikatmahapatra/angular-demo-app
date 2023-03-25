import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  providers: [FormValidationService]
})
export class ResetPasswordFormComponent implements OnInit {

  submitted = false;
  loading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private formValidationSvc: FormValidationService,
    private alertSvc: AlertService,
    private apiSvc: ApiService
  ) { }

  ngOnInit(): void {
  }

  resetPasswordForm = this.fb.group({
    otp: ['', Validators.required],
    email: ['', [Validators.required, this.formValidationSvc.validEmail]],
    password: ['', [Validators.required, this.formValidationSvc.strongPassword, this.formValidationSvc.matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, this.formValidationSvc.matchValidator('password')]]
  });

  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.resetPasswordForm.valid) {
      const postData = this.resetPasswordForm.value;
      this.apiSvc.post(AppConfig.apiUrl.resetPassword, postData).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.resetPasswordForm.reset();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
      this.formValidationSvc.validateAllFormFields(this.resetPasswordForm);
    }

  }

}
