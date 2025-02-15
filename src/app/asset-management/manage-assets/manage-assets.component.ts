import { Component } from '@angular/core';

@Component({
    selector: 'app-manage-assets',
    templateUrl: './manage-assets.component.html',
    styleUrls: ['./manage-assets.component.scss'],
    standalone: false
})
export class ManageAssetsComponent {
  dataRow = [];
  showTableDataLoading = false;
  
  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 10;
  itemPerPageDropdown = [10, 20, 30, 50, 100, 150, 200];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
  }
  // Pagination Config
}
