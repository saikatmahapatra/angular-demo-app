import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';


@Component({
  selector: 'app-timesheet-report',
  templateUrl: './timesheet-report.component.html',
  styleUrls: ['./timesheet-report.component.scss']
})
export class TimesheetReportComponent implements OnInit {
  rangeDates!: Date[];
  minDate!: Date;
  maxDate!: Date;
  userList: any[] = [];
  projectList: any[] = [];
  selectedEmployees = [];
  selectedProjects = [];
  loading = false;
  timesheetData = [];

  myForm = this.fb.group({
    action: ['timesheetReport'],
    dateRange: [null, [Validators.required]],
    employee: [null],
    projects: [null]
  });

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private alertSvc: AlertService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService
  ) {
    let today = new Date();
    this.maxDate = today;
  }

  ngOnInit(): void {
    this.getUserDropdown();
    this.getProjectDropdown();
  }

  getUserDropdown() {
    this.apiSvc.get(AppConfig.apiUrl.userDropdown).subscribe({
      next: (response: any) => {
        this.userList = response?.data;
      }
    });
  }

  getProjectDropdown() {
    this.apiSvc.get(AppConfig.apiUrl.projectDropdown).subscribe({
      next: (response: any) => {
        this.projectList = response?.data;
      }
    });
  }

  onSubmit() {
    this.timesheetData = [];
    if (this.myForm.valid && this.myForm.get('action')?.value === 'timesheetReport') {
      this.apiSvc.post(AppConfig.apiUrl.timesheetReport, this.myForm.value).subscribe({
        next: (response: any) => {
          this.timesheetData = response?.data?.data_rows;
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }
}
