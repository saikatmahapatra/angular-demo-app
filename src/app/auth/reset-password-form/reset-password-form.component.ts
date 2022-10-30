import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  providers: [FormValidationService]
})
export class ResetPasswordFormComponent implements OnInit {

  submitted = false;

  constructor(
    private fb: UntypedFormBuilder, 
    private formValidationSvc: FormValidationService,
    private alertSvc: AlertService,
    private apiSvc: ApiService
    ) { }

  ngOnInit(): void {
  }

  resetPasswordForm = this.fb.group({
    otp: ['', Validators.required, Validators.maxLength(6)],
    email: ['', [Validators.required, this.formValidationSvc.validEmail]],
    password: ['', [Validators.required, this.formValidationSvc.matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, this.formValidationSvc.matchValidator('password')]]
  });

  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.resetPasswordForm.valid) {
      const postData = this.resetPasswordForm.value;
      // this.apiSvc.getDashboardStat().subscribe({
      //   next: (response: any) => {
      //   }, 
      //   error: (err) => {
      //   },
      //   complete: ()=> {
      //   }
      // });
    } else {
      this.formValidationSvc.validateAllFormFields(this.resetPasswordForm);
    }
    
  }

}
