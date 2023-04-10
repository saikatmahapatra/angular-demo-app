import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  submitted = false;
  loading = false;
  rangeDates!: Date[];
  minDate!: Date;
  maxDate!: Date;
  leaveFormData = [];
  leaveType = [
    { text: 'CL-Casual Leave', val: 'CL' },
    { text: 'PL-Privileged Leave', val: 'PL' },
    { text: 'SL-Sick Leave', val: 'SL' },
    { text: 'CO-Compensatory Off', val: 'CO' }
  ];

  leaveSlot = [
    { text: 'FD-Full Day', val: 'FD' },
    { text: 'HD1-Half Day-First Half', val: 'HD1' },
    { text: 'HD2-Half Day-Second Half', val: 'HD2' }
  ];

  myForm = this.fb.group({
    action: ['applyLeave'],
    fromToDate: ['', [Validators.required]],
    leaveType: ['', Validators.required],
    leaveSlot: ['', Validators.required],
    leaveReason: ['', [Validators.required, Validators.maxLength(100)]]
  });

  constructor(
    private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
  ) { }

  ngOnInit(): void {
    this.getLeaveFormData();
  }

  getLeaveFormData() {
    this.apiSvc.get(AppConfig.apiUrl.getLeaveData).subscribe({
      next: (response: any) => {
        this.alertSvc.success(response.message, true);
        this.resetFormValue();
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'applyLeave') {
      this.apiSvc.post(AppConfig.apiUrl.applyLeave, this.myForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message, true);
          this.resetFormValue();
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

}
