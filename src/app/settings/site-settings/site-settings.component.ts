import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';

@Component({
    selector: 'app-site-settings',
    templateUrl: './site-settings.component.html',
    styleUrls: ['./site-settings.component.scss'],
    standalone: false
})
export class SiteSettingsComponent implements OnInit {
  submitted = false;
  loading = false;

  siteSettingsForm = this.fb.group({
    id: [null],
    action: ['updateSettings'],
    timesheetMinDays: ['', [Validators.required, this.validator.numericOnly, Validators.min(3), Validators.max(60)]],
    timesheetMaxDays: ['', [Validators.required, this.validator.numericOnly, Validators.min(0), Validators.max(60)]],
    emailNotifyDistro: ['', [this.validator.validEmail, this.validator.validEmailDomain]]
  });

  constructor(
    private commonSvc: CommonService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService
  ) { 
    this.commonSvc.setTitle('Settings');
  }


  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.apiSvc.get(CustomAppConfig.apiUrl.getSettings).subscribe({
      next: (response: any) => {
        if(response?.data) {
          this.siteSettingsForm.patchValue({
            timesheetMinDays: response?.data?.timesheetMinDays,
            timesheetMaxDays: response?.data?.timesheetMaxDays,
            emailNotifyDistro: response?.data?.emailNotifyDistro,
          });
        }
      },
      error: (response: HttpErrorResponse) => {
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.siteSettingsForm.valid) {
      
      this.apiSvc.put(CustomAppConfig.apiUrl.updateSiteSettings, this.siteSettingsForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.setAlert('success', response.message, false);
          this.getSettings();
        },
        error: (response: HttpErrorResponse) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
      

    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.siteSettingsForm);
    }
  }

}
