import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss']
})
export class EditTimesheetComponent implements OnInit {
  taskDescr : any;
  myForm = this.fb.group({
    id: [null],
    date: [null],
    action: ['edit'],
    project: ['', Validators.required],
    task: ['', Validators.required],
    hours: ['', Validators.required],
    description: ['', [this.validator.notEmpty]]
  });
  projectList: any;
  taskList: any;
  timesheetData: any = [];
  submitted: boolean = false;
  loading: boolean = false;
  id: any = null;

  constructor(
    private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private alertSvc: AlertService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {
    let today = new Date();
  }

  ngOnInit(): void {
    this.getFormData();
    if (this.router.url.indexOf('edit-address') != -1) {
      this.myForm.controls['action'].setValue('edit');
    }

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.getTimesheetData();
    }
  }

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.timesheetFormData).subscribe((response: any) => {
      this.projectList = response?.data?.projects;
      this.taskList = response?.data?.tasks;
    });
  }

  getTimesheetData() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.id);
    let options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getTimesheet, options).subscribe({
      next: (response: any) => {
        this.timesheetData = response?.data?.data_rows[0];
        this.patchFormValue(response?.data?.data_rows[0])
      }
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      date: data?.timesheet_date,
      action: 'edit',
      project: data?.project_id,
      task: data?.task_id_1,
      hours: data?.timesheet_hours,
      description: data?.timesheet_description
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'edit') {
      this.apiSvc.put(AppConfig.apiUrl.updateTimesheet, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.router.navigate(['timesheet/log-work']);
          }
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }

  }
}
