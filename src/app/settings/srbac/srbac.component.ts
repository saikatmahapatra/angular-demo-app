import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
    selector: 'app-srbac',
    templateUrl: './srbac.component.html',
    styleUrls: ['./srbac.component.scss'],
    standalone: false
})
export class SrbacComponent implements OnInit {

  dataRoles: any;
  dataPermissions: any;

  submitted = false;
  loading = false;

  constructor(
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private commonSvc: CommonService
  ) {
    this.commonSvc.setTitle('Role Based Access');
  }

  ngOnInit() {
    this.getRolePermissions();
  }

  getRolePermissions() {
    const roleAPI = this.apiSvc.get(AppConfig.apiUrl.getRoles);
    //const permissionAPI = this.apiSvc.get(AppConfig.apiUrl.getPermissions);
    forkJoin([roleAPI]).subscribe({
      next: (response: any) => {
        if(response[0]) {
          this.dataRoles = response[0]?.data?.data_rows;
        }
        if(response[1]) {
          this.dataPermissions = response[1]?.data?.data_rows;
        }
      },
      error: (response: HttpErrorResponse) => {
        this.loading = false;
      },
      complete: () => { this.loading = false; }

    })
  }
}
