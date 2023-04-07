import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-leave-details-actions',
  templateUrl: './leave-details-actions.component.html',
  styleUrls: ['./leave-details-actions.component.scss']
})
export class LeaveDetailsActionsComponent implements OnInit {
  rowData: any= [];
  loading = false;
  submitted = false;
  leaveId !: number | string | null;
  constructor(
    private alertSvc: AlertService,
    private apiSvc: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.leaveId = params.get('id');
    });
    if (this.leaveId) {
      this.getLeaveData();
    }
  }

  getLeaveData() {
    let queryParams = new HttpParams();
    if (this.leaveId) {
      queryParams = queryParams.append('leaveId', this.leaveId);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getLeaves, options).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.loading = false;
        this.rowData = response?.data?.data_rows ?  response?.data?.data_rows[0] : [];
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    })
  }

}
