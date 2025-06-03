import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';

@Component({
    selector: 'app-people-i-lead',
    templateUrl: './people-i-lead.component.html',
    styleUrls: ['./people-i-lead.component.scss'],
    standalone: false
})
export class PeopleILeadComponent implements OnInit {
  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 10;
  itemPerPageDropdown = [10, 20, 30, 50, 100, 150, 200];
  userList: any = [];
  loading: boolean = false;
  showTableDataLoading = false;
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getUsersList();
  }
  // Pagination Config

  constructor(
    private apiSvc: ApiService,
    private commonSvc: CommonService
  ) { 
    this.commonSvc.setTitle('My Reportees');
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    let headers = new HttpHeaders();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.showTableDataLoading = true;
    this.apiSvc.get(CustomAppConfig.apiUrl.getReportees, { headers: headers }).subscribe({
      next: (val: any) => {
        this.totalRecords = val?.data?.num_rows;
        this.userList = val?.data?.data_rows;
        this.loading = false;
        this.showTableDataLoading = false;
      }
    });
  }

}
