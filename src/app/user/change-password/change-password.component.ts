import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
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

  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log('onSubmit===', this.myForm);
    this.loading = true;
    this.submitted = true;
    if (this.myForm.valid) {
      //console.log('form submitted', this.myForm.value);
      this.apiSvc.changePassword(this.myForm.value).subscribe((response: any) => {
        if (response.status == 'success') {
          this.alertSvc.success(response.message);
          this.myForm.reset();
        }
      });
    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
