import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-people-i-lead',
  templateUrl: './people-i-lead.component.html',
  styleUrls: ['./people-i-lead.component.scss']
})
export class PeopleILeadComponent implements OnInit {
  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 10;
  itemPerPageDropdown = [10, 20, 30, 50];
  userList: any = [];
  loading: boolean = false;
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getUsersList();
  }
  // Pagination Config

  constructor(
    private apiSvc: ApiService
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    let headers = new HttpHeaders();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.apiSvc.get(AppConfig.apiUrl.getReportees, { headers: headers }).subscribe({
      next: (val: any) => {
        this.totalRecords = val?.data?.num_rows;
        this.userList = val?.data?.data_rows;
        this.loading = false;
      }
    });
  }

}
