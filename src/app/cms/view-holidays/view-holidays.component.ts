import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-holidays',
  templateUrl: './view-holidays.component.html',
  styleUrls: ['./view-holidays.component.scss']
})
export class ViewHolidaysComponent implements OnInit {
  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthName: string = this.monthNames[this.month];;
  constructor() { }

  ngOnInit(): void {
  }

  getCSSClass(date: any) {
    let cssClass = '';
    // if(this.year == date.year && this.month == (date.month+1) && this.holidays.indexOf(date.day) > -1) {
    //   cssClass = 'date-holiday';
    // }
    // if(this.year == date.year && this.month == (date.month+1) && this.optionalHolidays.indexOf(date.day) > -1) {
    //   cssClass = 'date-holiday-opt';
    // }
    return cssClass;
  }

  monthYearChange(event: any) {
    this.month = event.month;
    this.year = event.year;
    this.monthName = this.monthNames[event.month - 1];
    //this.getTimesheetData();
  }

}
