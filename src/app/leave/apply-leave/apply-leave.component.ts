import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
    selector: 'app-apply-leave',
    templateUrl: './apply-leave.component.html',
    styleUrls: ['./apply-leave.component.scss'],
    standalone: false
})
export class ApplyLeaveComponent implements OnInit {
  submitted = false;
  loading = false;
  rangeDates!: Date[];
  minDate!: Date;
  maxDate!: Date;
  leaveFormData = [];
  approvers: any = [];
  leaveBalance: any = [];

  leaveType = [
    { text: 'CL-Casual Leave', val: 'CL' },
    { text: 'CO-Comp. Off', val: 'CO' },
    { text: 'PL-Privileged Leave', val: 'PL' },
    { text: 'SL-Sick Leave', val: 'SL' }
  ];

  leaveSlot = [
    { text: 'FD-Full Day', val: 'FD' },
    { text: 'HD1-Half Day-First Half', val: 'HD1' },
    { text: 'HD2-Half Day-Second Half', val: 'HD2' }
  ];
  leaveReasonList : any = [];

  myForm = this.fb.group({
    action: ['applyLeave'],
    fromToDate: ['', [Validators.required]],
    leaveType: ['', Validators.required],
    leaveSlot: ['FD', Validators.required],
    leaveReasonId: ['', [Validators.required]],
    //leaveReason: ['', [Validators.maxLength(100), , this.validator.notEmpty]]
  });

  constructor(
    private commonSvc: CommonService,
    private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private router: Router
  ) { 
    this.commonSvc.setTitle('Apply Leave');
  }

  ngOnInit(): void {
    this.getLeaveFormData();
  }

  getLeaveFormData() {
    this.apiSvc.get(AppConfig.apiUrl.getLeaveFormData).subscribe({
      next: (response: any) => {
        this.approvers = response?.data?.approvers;
        this.leaveBalance = response?.data?.leave_balance;
        this.leaveReasonList = response?.data?.leaveReasonList;
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.approvers.length > 0 && this.myForm.valid && this.myForm.get('action')?.value === 'applyLeave') {
      this.apiSvc.post(AppConfig.apiUrl.applyLeave, this.myForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.setAlert('success', response.message, true);
          this.resetFormValue();
          this.router.navigate(['/leave/history']);
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  resetFormValue() {
    this.myForm.reset();
    this.myForm.controls['action'].setValue('applyLeave');
  }

  hasLeaveBalance() {
    return this.leaveBalance[0]?.cl !== null && this.leaveBalance[0]?.pl !== null && this.leaveBalance[0]?.sl !== null;
  }

  hasApprovers() {
    return this.approvers[0]?.user_supervisor_id !==null && this.approvers[0]?.user_director_approver_id !== null;
  }

}
