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
  date1!: Date;
  dates: Date[] | undefined;
  maxDateCount = 4;
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

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    timeSheetDates: this.fb.array([], this.validator.minLengthArray),
    project: ['', Validators.required],
    task: ['', Validators.required],
    hours: ['', Validators.required],
    description: ['', Validators.required]
  });
  projectList: any;
  taskList: any;
  timesheetData: any = [];

  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50];
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
    let today = new Date();

    this.month = today.getMonth() + 1;
    this.year = today.getFullYear();

    this.minDate = new Date();
    this.minDate.setDate(today.getDate() - 3);

    this.maxDate = new Date();
    this.maxDate = today;
    this.monthName = this.monthNames[this.month - 1];
  }

  get timeSheetDates() {
    return this.myForm.controls["timeSheetDates"] as UntypedFormArray;
  }

  ngOnInit(): void {
    this.getFormData();
    this.getTimesheetData();
  }

  getFormData() {
    this.holidays = [];
    this.optionalHolidays = [];
    this.apiSvc.get(AppConfig.apiUrl.timesheetFormData).subscribe((response: any) => {
      this.holidaysFound = true;
      this.projectList = response?.data?.projects;
      this.taskList = response?.data?.tasks;
      const holidays = response?.data?.holidays;
      const optionalHolidays = response?.data?.optionalHolidays;
      if (holidays.length > 0) {
        holidays.forEach((element: any) => {
          let dayDate = element.holiday_date.split('-'); // YYYY-MM-DD
          this.holidays.push(Number(dayDate[2]));
        });
      }
      if (optionalHolidays.length > 0) {
        optionalHolidays.forEach((element: any) => {
          let dayDate = element.holiday_date.split('-'); // YYYY-MM-DD
          this.optionalHolidays.push(Number(dayDate[2]));
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
            let dayDate = element.timesheet_date.split('-'); // YYYY-MM-DD
            this.timesheetFilledDays.push(Number(dayDate[2]));
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
            this.myForm.reset();
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

  // viewTimesheetLog() {
  //   this.router.navigate(['timesheet/view'], { queryParams: { month: this.month, year: this.year } });
  // }

  dateSelected(event: any) {
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) {
      this.daysSelected.push(date);
      this.addTimeSheetDate(date);
    }
    else {
      this.daysSelected.splice(index, 1);
      this.deleteTimeSheetDate(index);
    }
  }

  addTimeSheetDate(date: string) {
    const form = this.fb.group({
      date: [date, Validators.required]
    });
    this.timeSheetDates.push(form);
  }

  deleteTimeSheetDate(index: number) {
    this.timeSheetDates.removeAt(index);
  }

  monthYearChange(event: any) {
    //this.currentPageIndex = 0;
    //this.totalRecords = 0;
    this.month = event.month;
    this.year = event.year;
    this.monthName = this.monthNames[event.month - 1];
    this.getTimesheetData();
  }

  getCSSClass(date: any) {
    let cssClass = '';
    if (this.year == date.year && this.month == (date.month + 1) && this.timesheetFilledDays.indexOf(date.day) > -1) {
      cssClass = 'date-filled';
    }
    // if(this.year == date.year && this.month == (date.month+1) && this.holidays.indexOf(date.day) > -1) {
    //   cssClass = 'date-holiday';
    // }
    // if(this.year == date.year && this.month == (date.month+1) && this.optionalHolidays.indexOf(date.day) > -1) {
    //   cssClass = 'date-holiday-opt';
    // }
    return cssClass;
  }

  isDeleteComplete(event: boolean) {
    if (event) {
      this.getTimesheetData();
    }
  }
}


