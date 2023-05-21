import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss']
})
export class SiteSettingsComponent implements OnInit {
  submitted = false;
  loading = false;

  timesheetSettingsForm = this.fb.group({
    id: [null],
    action: ['updateTimesheetSettings'],
    timesheetMinDays: ['', [Validators.required, this.validator.numericOnly, Validators.min(3), Validators.max(60)]],
    timesheetMaxDays: ['', [Validators.required, this.validator.numericOnly, Validators.min(0), Validators.max(60)]]
  });

  constructor(
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService
  ) { }


  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.apiSvc.get(AppConfig.apiUrl.getSettings).subscribe({
      next: (response: any) => {
        if(response?.data) {
          this.timesheetSettingsForm.patchValue({
            timesheetMinDays: response?.data?.timesheetMinDays,
            timesheetMaxDays: response?.data?.timesheetMaxDays
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
    if (this.timesheetSettingsForm.valid) {
      
      this.apiSvc.put(AppConfig.apiUrl.updateTimesheetSettings, this.timesheetSettingsForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message, true);
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
      this.validator.validateAllFormFields(this.timesheetSettingsForm);
    }
  }

}
