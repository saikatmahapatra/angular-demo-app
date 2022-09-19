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
  event: any;

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    let cellClass = '';
    const dateCell = cellDate.getFullYear() + "-" + ("00" + (cellDate.getMonth() + 1)).slice(-2) + "-" + ("00" + cellDate.getDate()).slice(-2);
    const isSelected = this.daysSelected.find(x => x == dateCell) ? true : false;
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
  ) { }

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
