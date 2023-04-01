import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-cms',
  templateUrl: './manage-cms.component.html',
  styleUrls: ['./manage-cms.component.scss']
})
export class ManageCmsComponent implements OnInit {
  dataRow: any;

  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getContents();
  }
  // Pagination Config

  constructor(
    public apiSvc: ApiService,
    private router: Router,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents() {
    let headers = new HttpHeaders();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.apiSvc.get(AppConfig.apiUrl.getPosts, { headers: headers }).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
    });
  }

  editPost(data: any) {
    this.router.navigate(['/cms/edit', data.id]);
  }

  deletePost(data: any) {
    let queryParams = new HttpParams();
    if (data.id) {
      queryParams = queryParams.append('id', data.id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.delete(AppConfig.apiUrl.deletePost, options).subscribe((response: any) => {
      this.alertSvc.success(response.message);
      this.getContents();
    });
  }

}