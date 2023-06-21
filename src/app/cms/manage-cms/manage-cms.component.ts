import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-cms',
  templateUrl: './manage-cms.component.html',
  styleUrls: ['./manage-cms.component.scss']
})
export class ManageCmsComponent implements OnInit {
  dataRow: any;
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
    this.getContents(this.postType);
  }
  // Pagination Config

  postType: any = '';
  contentCategoryList = [
    {id: 'notice', name: 'Notice'},
    {id: 'news', name: 'News'},
    {id: 'policy', name: 'HR Policy'},
    //{id: 'mandatory_holiday', name: 'Mandatory Holiday'},
    //{id: 'optional_holiday', name: 'Optional Holiday'},
  ];

  constructor(
    private commonSvc: CommonService,
    public apiSvc: ApiService,
    private router: Router,
    private alertSvc: AlertService
  ) { 
    this.commonSvc.setTitle('CMS');
  }

  ngOnInit(): void {
    this.getContents(this.postType);
  }

  getContents(type?: string) {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if(type) {
      params = params.append('type', type)
    }
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    params = params.append('pageName', 'managePosts');
    this.showTableDataLoading = true;
    this.apiSvc.get(AppConfig.apiUrl.getPosts, { headers: headers, params: params }).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
      this.showTableDataLoading = false;
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
      this.getContents(this.postType);
    });
  }

  postTypeChange() {
    this.currentPageIndex = 0;
    this.getContents(this.postType);
  }

}