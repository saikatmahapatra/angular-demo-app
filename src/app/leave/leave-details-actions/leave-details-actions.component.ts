import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-leave-details-actions',
  templateUrl: './leave-details-actions.component.html',
  styleUrls: ['./leave-details-actions.component.scss']
})
export class LeaveDetailsActionsComponent implements OnInit {
  rowData: any = [];
  loading = false;
  submitted = false;
  leaveId !: number | string | null;
  leaveStatus: any[] = [
    { value: 'B', text: 'Applied', cssClass: 'bg-primary', textClass: 'text-primary' },
    { value: 'O', text: 'Processing', cssClass: 'bg-info', textClass: 'text-info' },
    { value: 'A', text: 'Approved', cssClass: 'bg-success', textClass: 'text-success' },
    { value: 'R', text: 'Rejected', cssClass: 'bg-danger', textClass: 'text-danger' },
    { value: 'P', text: 'Pending', cssClass: 'bg-primary', textClass: 'text-secondary' },
    { value: 'C', text: 'Cancelled', cssClass: 'bg-warning', textClass: 'text-warning' },
    { value: 'X', text: 'Cancel Requested', cssClass: 'bg-warning', textClass: 'text-warning' }
  ];
  progressBarClass = 'bg-primary';
  progressText = 'Process 1/3 completed';
  progressValue = 33;
  userId!: string;
  constructor(
    private alertSvc: AlertService,
    private apiSvc: ApiService,
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authSvc.getUserId();
    this.activatedRoute.paramMap.subscribe(params => {
      this.leaveId = params.get('id');
    });
    if (this.leaveId) {
      this.getLeaveData();
    }
  }

  getStatusText(statusChar: string) {
    let obj = this.leaveStatus.find(o => o.value === statusChar);
    return obj;
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
        this.rowData = response?.data?.data_rows ? response?.data?.data_rows[0] : [];
        if (this.rowData.leave_status === 'O') {
          this.progressValue = 67;
          this.progressBarClass = 'bg-success';
          this.progressText = 'Workflow 2/3 completed';
        }
        if (this.rowData.leave_status === 'A') {
          this.progressValue = 100;
          this.progressBarClass = 'bg-success';
          this.progressText = 'Workflow 3/3 completed';
        }
        if (this.rowData.leave_status === 'R') {
          this.progressValue = 100;
          this.progressBarClass = 'bg-danger';
          this.progressText = 'Workflow 3/3 completed';
        }
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    })
  }

  approveRejectRequest(leaveId: any, workFlow: string, status: string, userId: string) {
    console.log(leaveId, workFlow, status);
    this.loading = true;
    const postData = {id: leaveId, userId: userId, workflow: workFlow, newStatus: status};
    this.apiSvc.post(AppConfig.apiUrl.updateLeave, postData).subscribe({
      next: (response: any) => {
        this.alertSvc.success(response.message, true);
        this.loading = false;
        this.getLeaveData();
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }

    })

  }

}
