import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-edit-approvers',
  templateUrl: './edit-approvers.component.html',
  styleUrls: ['./edit-approvers.component.scss']
})
export class EditApproversComponent implements OnInit {
  data: any;
  currentApprovers: any = {};
  searchKeywords = '';
  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 10;
  itemPerPageDropdown = [10, 20, 30, 50, 100];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getEmp();
  }
  // Pagination Config
  constructor(
    private apiSvc: ApiService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    this.getApprovers();
  }

  getApprovers() {
    this.apiSvc.get(AppConfig.apiUrl.approvers).subscribe((response: any) => {
      this.currentApprovers = response?.data ? response?.data[0] : {};
    });
  }


  getSearchInputVal(str: string) {
    this.searchKeywords = str;
    this.currentPageIndex = 0;
    this.totalRecords = 0;
    this.getEmp();
  }

  getEmp() {
    let queryParams = new HttpParams();
    let postData = { keywords: this.searchKeywords, action: 'search' };
    let headers = new HttpHeaders();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.apiSvc.post(AppConfig.apiUrl.searchUser, postData, { headers: headers }).subscribe({
      next: (response: any) => {
        this.data = response?.data?.data_rows;
        this.totalRecords = response?.data?.num_rows;
      }
    });
  }

  setApprover(event: any, user?: any) {
    if (event.target.value) {
      const data = { approverType: event.target.value, userDetails: user }
      this.apiSvc.post(AppConfig.apiUrl.changeApprovers, data).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message);
          this.getApprovers();
        },
        error: () => {

        },
        complete: () => {
          //this.markAsRead();
        }
      });
    }
  }

}
