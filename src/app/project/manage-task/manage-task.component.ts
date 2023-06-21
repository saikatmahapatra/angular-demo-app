import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.scss']
})
export class ManageTaskComponent implements OnInit {

  dataRow: any;
  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 10;
  itemPerPageDropdown = [10, 20, 30, 50, 100, 150, 200];
  showTableDataLoading = false;
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getTasks();
  }
  // Pagination Config

  constructor(
    private commonSvc: CommonService,
    public apiSvc: ApiService, 
    private alertSvc: AlertService, 
    private router: Router
    ) { 
      this.commonSvc.setTitle('Manage Tasks');    
    }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.showTableDataLoading = true;
    this.apiSvc.get(AppConfig.apiUrl.getTask, { headers: headers, params: params }).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
      this.showTableDataLoading = false;
    });
  }

  editItem(data: any) {
    this.router.navigate(['/project/edit-task', data.id]);
  }

  // deleteItem(data: any) {
  //   let queryParams = new HttpParams();
  //   if (data.id) {
  //     queryParams = queryParams.append('id', data.id);
  //   }
  //   let options = {};
  //   options = { params: queryParams };
  //   this.apiSvc.delete(AppConfig.apiUrl.deleteProject, options).subscribe((response: any) => {
  //     this.alertSvc.success(response.message);
  //     this.getTasks();
  //   });
  // }

}
