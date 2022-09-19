import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
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
    //console.log('selected=>', this.daysSelected);
    // Only highligh dates inside the month view.
    const date = cellDate.getDate();
    if (view === 'month' && (date === 1 || date === 20)) {
      cellClass += ' yellow ';
    }
    // highligh on select.
    if (isSelected) {
      cellClass += ' selected ';
    }
    if (isFilled) {
      cellClass += ' time-filled ';
    }
    if (isHoliday) {
      cellClass += ' holiday ';
    }
    return cellClass;
  };

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    dates: [''],
    project: ['', Validators.required],
    task: ['', Validators.required],
    hours: [9, Validators.required],
    description: ['', Validators.required]
  });


  constructor(
    private fb: FormBuilder
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.timesheetFilledDays = ["2022-09-07", "2022-09-08"];
    this.holidays = ["2022-09-17"];
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  select(event: any, calendar: any) {
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    calendar.updateTodaysDate();
  }

}
