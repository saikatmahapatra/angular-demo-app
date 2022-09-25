import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimesheetFormComponent implements OnInit {
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
  minCalDate = new Date('2022-09-17');


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    let cellClass = '';
    const dateCell = cellDate.getFullYear() + "-" + ("00" + (cellDate.getMonth() + 1)).slice(-2) + "-" + ("00" + cellDate.getDate()).slice(-2);
    const isSelected = this.daysSelected.find(x => x == dateCell) ? true : false;
    const isFilled = this.timesheetFilledDays.find(x => x == dateCell) ? true : false;
    const isHoliday = this.holidays.find(x => x == dateCell) ? true : false;
    const isOptionalHoliday = this.optionalHolidays.find(x => x == dateCell) ? true : false;
    //console.log('selected=>', this.daysSelected);
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

  constructor(
    private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.timesheetFilledDays = ["2022-09-07", "2022-09-08"];
    this.holidays = ["2022-09-17"];
    this.optionalHolidays = ["2022-09-13"];
  }

  get timeSheetDates() {
    return this.myForm.controls["timeSheetDates"] as FormArray;
  }

  ngOnInit(): void {
    this.getFormData();
  }

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.timesheetFormData).subscribe((val: any) => {
      this.projectList = val?.data?.projects;
      this.taskList = val?.data?.tasks
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log('Submitted', this.myForm);

    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      console.log('VALIDATED');
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }

  }

  select(event: any, calendar: any) {
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0){
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
