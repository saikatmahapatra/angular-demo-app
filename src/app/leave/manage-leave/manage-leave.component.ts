import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-leave',
  templateUrl: './manage-leave.component.html',
  styleUrls: ['./manage-leave.component.scss']
})
export class ManageLeaveComponent implements OnInit {
  dataRow = [];
  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
  }
  // Pagination Config
  constructor() { }

  ngOnInit(): void {
  }

}
