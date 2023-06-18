import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss']
})
export class ViewEmployeesComponent implements OnInit {
  public empList: any = [];
  loading: boolean = true;
  searchKeyword = '';
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
    this.getEmpList();
  }
  // Pagination Config

  constructor(
    private apiSvc: ApiService,
    private commonSvc: CommonService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getEmpList();
  }

  getSearchKeyword(str: string) {
    this.searchKeyword = str;
    this.resetPagination();
    this.getEmpList();
  }

  resetPagination() {
    this.currentPageIndex = 0;
    this.totalRecords = 0;
    this.itemPerPage = 10;
  }

  getEmpList() {
    //this.empList = [];
    let options = {};
    let queryParams = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.showTableDataLoading = true;
    if(this.searchKeyword.trim()) {
      queryParams = queryParams.append('keywords', this.searchKeyword.trim());
    }
    options = { params: queryParams, headers: headers };
    this.apiSvc.get(AppConfig.apiUrl.getEmployees, options).subscribe({
      next: (val: any) => {
        this.totalRecords = val?.data?.num_rows;
        this.empList = val?.data?.data_rows || [];
        this.loading = false;
        this.showTableDataLoading = false;
      }
    });
  }

}
