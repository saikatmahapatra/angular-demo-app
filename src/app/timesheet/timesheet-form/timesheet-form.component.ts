import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatCalendarCellClassFunction, MatDatepicker } from '@angular/material/datepicker';
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
  userId!: null;
  submitted = false;
  loading = false;
  selected!: Date | null;
  daysSelected: any[] = [];
  timesheetFilledDays: any[] = [];
  holidays: any[] = [];
  optionalHolidays: any[] = [];
  event: any;
  minDate!: Date;
  maxDate!: Date;
  minCalDate = new Date();
  holidaysFound = false;
  entryFound = false;
  @ViewChild("calendar", { static: false }) matCal: MatDatepicker<any> | undefined;
  //https://stackblitz.com/edit/angular-8-material-starter-template-nv9r4w?file=src%2Fapp%2Fapp.component.ts

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    let cellClass = '';
    const dateCell = cellDate.getFullYear() + "-" + ("00" + (cellDate.getMonth() + 1)).slice(-2) + "-" + ("00" + cellDate.getDate()).slice(-2);
    const isSelected = this.daysSelected.find(x => x == dateCell) ? true : false;
    const isFilled = this.timesheetFilledDays.find(x => x == dateCell) ? true : false;
    const isHoliday = this.holidays.find(x => x == dateCell) ? true : false;
    const isOptionalHoliday = this.optionalHolidays.find(x => x == dateCell) ? true : false;
    console.log('selected=>', dateCell[0]);
    // Only highligh dates inside the month view.
    const date = cellDate.getDate();
    // if (view === 'month' && (date === 1 || date === 20)) {
    //   cellClass += ' yellow ';
    // }

    if (isSelected) {
      cellClass += ' selected ';
    }
    if (isFilled) {
      cellClass += ' time-filled ';
    }
    if (isHoliday) {
      cellClass += ' holiday ';
    }
    if (isOptionalHoliday) {
      cellClass += ' optional-holiday ';
    }
    return cellClass;
  };

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
    private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private alertSvc: AlertService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

    //this.getFormData();

    //this.timesheetFilledDays = ["2022-09-07", "2022-09-08"];
    //this.holidays = ["2022-09-25", "2022-09-22"];
    //this.optionalHolidays = [];
  }

  get timeSheetDates() {
    return this.myForm.controls["timeSheetDates"] as FormArray;
  }

  ngOnInit(): void {
    this.getFormData();
    this.getTimesheetData();
  }

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.timesheetFormData).subscribe((response: any) => {
      this.holidaysFound = true;
      this.projectList = response?.data?.projects;
      this.taskList = response?.data?.tasks;
      const holidays = response?.data?.holidays;
      const optionalHolidays = response?.data?.optionalHolidays;
      if (holidays.length > 0) {
        holidays.forEach((element: any) => {
          this.holidays.push(element.holiday_date);
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
    let queryParams = new HttpParams();
    queryParams = queryParams.append('userId', this.authSvc.getUserId());
    let options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getTimesheet, options).subscribe((response: any) => {
      this.entryFound = true;
      this.timesheetData = response?.data?.data_rows;
      if (this.timesheetData.length > 0) {
        this.timesheetData.forEach((element: any) => {
          this.timesheetFilledDays.push(element.timesheet_date);
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

  select(event: any, calendar: any) {
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    console.log(date);
    if (index < 0) {
      this.daysSelected.push(date);
      this.addTimeSheetDate(date);
    }
    else {
      this.daysSelected.splice(index, 1);
      this.deleteTimeSheetDate(index);
    }
    calendar.updateTodaysDate();
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

}


