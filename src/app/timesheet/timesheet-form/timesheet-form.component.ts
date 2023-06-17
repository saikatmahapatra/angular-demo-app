import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetFormComponent implements OnInit {
  maxDateCount = 5;
  userId!: null;
  submitted = false;
  loading = false;
  selected!: Date | null;
  daysSelected: any[] = [];
  timesheetFilledDays: number[] = [];
  holidays: any[] = [];
  optionalHolidays: any[] = [];
  event: any;
  minDate!: Date;
  maxDate!: Date;
  holidaysFound = false;
  entryFound = false;
  month: number = 0;
  year: number = 0;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthName: string = '';
  allowedMinDate = 30;
  settings: any;
  taskDescr = '';

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    timeSheetDates: [null, Validators.required],
    project: ['', Validators.required],
    task: ['', Validators.required],
    hours: ['', Validators.required],
    description: ['', [this.validator.notEmpty]]
  });
  projectList: any;
  taskList: any;
  timesheetData: any = [];

  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 50;
  itemPerPageDropdown = [10, 20, 30, 50, 100, 150, 200];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getTimesheetData();
  }
  // Pagination Config

  constructor(
    private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private alertSvc: AlertService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {

  }

  // get timeSheetDates() {
  //   return this.myForm.controls["timeSheetDates"] as UntypedFormArray;
  // }

  ngOnInit(): void {
    let today = new Date();
    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();
    this.monthName = this.monthNames[this.month - 1];

    this.minDate = new Date();
    this.minDate.setDate(today.getDate() - this.allowedMinDate);
    this.maxDate = new Date();
    this.maxDate = today;

    this.getFormData();
    this.getTimesheetData();
  }

  getFormData() {
    let today = new Date();
    this.holidays = [];
    this.optionalHolidays = [];
    this.apiSvc.get(AppConfig.apiUrl.timesheetFormData).subscribe((response: any) => {
      this.holidaysFound = true;
      this.projectList = response?.data?.projects;
      this.taskList = response?.data?.tasks;
      const holidays = response?.data?.holidays;
      const optionalHolidays = response?.data?.optionalHolidays;
      const minDays = response?.data?.settings?.timesheetMinDays;
      this.minDate = new Date();
      this.minDate.setDate(today.getDate() - Number(minDays));

      const maxDays = response?.data?.settings?.timesheetMaxDays;
      this.maxDate = new Date();
      this.maxDate.setDate(today.getDate() + Number(maxDays));

      if (holidays.length > 0) {
        holidays.forEach((element: any) => {
          this.holidays.push(new Date(element.holiday_date).getTime());
        });
      }
      if (optionalHolidays.length > 0) {
        optionalHolidays.forEach((element: any) => {
          this.optionalHolidays.push(new Date(element.holiday_date).getTime());
        });
      }
    });
  }

  getTimesheetData() {
    this.timesheetFilledDays = [];
    let queryParams = new HttpParams();
    queryParams = queryParams.append('userId', this.authSvc.getUserId());
    queryParams = queryParams.append('month', this.month);
    queryParams = queryParams.append('year', this.year);
    let headers = new HttpHeaders();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    let options = { headers: headers, params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getTimesheet, options).subscribe({
      next: (response: any) => {
        this.entryFound = true;
        this.timesheetData = response?.data?.data_rows;
        this.totalRecords = response?.data['num_rows'];
        if (this.timesheetData.length > 0) {
          this.timesheetData.forEach((element: any) => {
            this.timesheetFilledDays.push(new Date(element.timesheet_date).getTime());
          });
        }
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addTimesheet, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.resetTimesheetForm();
            this.getTimesheetData();
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

  resetTimesheetForm() {
    this.myForm.reset({
      id: null,
      action: 'add',
      timeSheetDates: null,
      project: '',
      task: '',
      hours: '',
      description: ''
    });
  }

  monthYearChange(event: any) {
    //this.currentPageIndex = 0;
    //this.totalRecords = 0;
    this.month = event.month;
    this.year = event.year;
    this.monthName = this.monthNames[event.month - 1];
    this.getTimesheetData();
  }

  getCSSClass(dateObj: any) {
    const dt = dateObj.year + '-' + ('0' + (dateObj.month + 1)).slice(-2) + '-' + ('0' + dateObj.day).slice(-2);
    const dateTimeValue = new Date(dt).getTime();
    let cssClass = '';
    if (this.timesheetFilledDays.indexOf(dateTimeValue) > -1) {
      cssClass = 'date-filled';
    }
    if (this.holidays.indexOf(dateTimeValue) > -1) {
      cssClass = 'date-holiday';
    }
    if(this.optionalHolidays.indexOf(dateTimeValue) > -1) {
      cssClass = 'date-holiday-opt';
    }
    return cssClass;
  }

  isDeleteComplete(event: boolean) {
    if (event) {
      this.getTimesheetData();
    }
  }
}


