import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.scss']
})
export class ManageTaskComponent implements OnInit {

  dataRow: any;
  totalRecords: any;

  constructor(public apiSvc: ApiService, private alertSvc: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.getTasks();
  }
  
  getTasks() {
    this.apiSvc.get(AppConfig.apiUrl.getTask).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
    });
  }

  // delete(id: any) {
  //   let queryParams = new HttpParams();
  //   if (id) {
  //     queryParams = queryParams.append('id', id);
  //   }
  //   let options = {};
  //   options = { params: queryParams };
  //   this.apiSvc.delete(AppConfig.apiUrl.deleteProject, options).subscribe((response: any) => {
  //     this.alertSvc.success(response.message);
  //     this.getTasks();
  //   });
  // }

}
