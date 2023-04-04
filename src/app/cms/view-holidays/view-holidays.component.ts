import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-holidays',
  templateUrl: './view-holidays.component.html',
  styleUrls: ['./view-holidays.component.scss']
})
export class ViewHolidaysComponent implements OnInit {
  startYear: number = 2015;
  currentYear: number = new Date().getFullYear();
  dataRow: any;
  selectedYear: number = this.currentYear;
  yearList = [];
  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getHolidays();
  }
  // Pagination Config
  constructor() { }

  ngOnInit(): void {
    this.getHolidays();
  }

  getHolidays() {
    console.log(this.selectedYear);
  }

  yearChange() {

  }
}
