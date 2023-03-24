import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent implements OnInit {

  submitted = false;
  loading = false;

  constructor(
    private alertSvc: AlertService,
    private apiSvc: ApiService,
    private fb: UntypedFormBuilder,
    private formValidationSvc: FormValidationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  fpForm = this.fb.group({
    action: ['forgotPassword'],
    email: ['', [Validators.required, this.formValidationSvc.validEmail]],
  });

  get f() { return this.fpForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.fpForm.valid) {
      const postData = this.fpForm.value;
      this.apiSvc.post(AppConfig.apiUrl.checkEmail, postData).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.router.navigate(['auth/reset-password']);
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
      this.formValidationSvc.validateAllFormFields(this.fpForm);
    }

  }

}
