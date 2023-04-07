import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-leave',
  templateUrl: './manage-leave.component.html',
  styleUrls: ['./manage-leave.component.scss']
})
export class ManageLeaveComponent implements OnInit {
  dataRow = [];
  loading = false;
  submitted = false;
  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getLeaveData();
  }
  // Pagination Config

  searchForm = this.fb.group({
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required],
    leaveStatus: ['', Validators.required],
    action: ['search']
  });

  leaveStatus: any[] = [
    { value: 'B', text: 'Applied' },
    { value: 'O', text: 'Processing' },
    { value: 'A', text: 'Approved' },
    { value: 'R', text: 'Rejected' },
    { value: 'P', text: 'Pending' },
    { value: 'C', text: 'Cancelled' },
    { value: 'X', text: 'Cancel Requested' }
  ]

  constructor(
    private fb: FormBuilder,
    private alertSvc: AlertService,
    private router: Router,
    private validator: FormValidationService,
    private apiSvc: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.searchForm.valid) {
      this.currentPageIndex = 0;
      this.totalRecords = 0;
      this.getLeaveData();
    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.searchForm);
    }
  }

  getLeaveData() {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.apiSvc.post(AppConfig.apiUrl.getLeaves, this.searchForm.value, { headers: headers }).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.loading = false;
        this.dataRow = response?.data?.data_rows || [];
        this.totalRecords = response?.data?.num_rows || 0;
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    })
  }

}
