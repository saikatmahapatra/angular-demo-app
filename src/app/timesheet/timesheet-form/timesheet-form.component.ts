import { HttpParams } from '@angular/common/http';
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
  maxDateCount = 3;
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
  minCalDate = new Date();
  holidaysFound = false;
  entryFound = false;
  month: number = 0;
  year: number = 0;

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
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
    this.month = month + 1;
    this.year = year;
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
          this.holidays.push(Number(element.holiday_date));
        });
      }
      if (optionalHolidays.length > 0) {
        optionalHolidays.forEach((element: any) => {
          this.optionalHolidays.push(element.holiday_date);
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
    let options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getTimesheet, options).subscribe((response: any) => {
      this.entryFound = true;
      this.timesheetData = response?.data?.data_rows;
      if (this.timesheetData.length > 0) {
        this.timesheetData.forEach((element: any) => {
          let dayDate = element.timesheet_date.split('-'); // YYYY-MM-DD
          this.timesheetFilledDays.push(Number(dayDate[2]));
        });
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
            window.location.reload();
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

  viewTimesheetLog() {
    this.router.navigate(['timesheet/view']);
  }

  dateSelected(event: any) {
    console.log("dateSelected", event);
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
    this.month = event.month;
    this.year = event.year;
    this.getTimesheetData();
  }
}


