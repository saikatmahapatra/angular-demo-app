import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  submitted = false;
  loading = false;

  myForm = this.fb.group({
    action: ['changePassword'],
    currentPassword: [null, [Validators.required]],
    password: [null, [Validators.required, this.validator.strongPassword, this.validator.matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, this.validator.matchValidator('password')]]
  });

  constructor(private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.myForm.valid) {
      this.apiSvc.post(AppConfig.apiUrl.changePassword, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message);
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
