import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
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
  title = 'Manage Leave Requests';
  isManagePage = true;
  isHistoryPage = false;
  isLeaveToApprovePage = false;
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
  fromDate = new Date();
  toDate = new Date()
  searchForm = this.fb.group({
    empInfo: [''],
    //fromDate: [new Date(), Validators.required],
    //toDate: [new Date(), Validators.required],
    leaveStatus: [''],
    action: ['search']
  });

  leaveStatus: any[] = [
    { value: 'B', text: 'Applied', cssClass: 'bg-primary', textClass: 'text-primary' },
    { value: 'O', text: 'Processing', cssClass: 'bg-info', textClass: 'text-info' },
    { value: 'A', text: 'Approved', cssClass: 'bg-success', textClass: 'text-success' },
    { value: 'R', text: 'Rejected', cssClass: 'bg-danger', textClass: 'text-danger' },
    { value: 'P', text: 'Pending', cssClass: 'bg-primary', textClass: 'text-secondary' },
    { value: 'C', text: 'Cancelled', cssClass: 'bg-warning', textClass: 'text-warning' },
    { value: 'X', text: 'Cancel Requested', cssClass: 'bg-warning', textClass: 'text-warning' }
  ];

  constructor(
    private fb: FormBuilder,
    private alertSvc: AlertService,
    private router: Router,
    private validator: FormValidationService,
    private apiSvc: ApiService
  ) {
    //this.fromDate.setMonth(new Date().getMonth() - 1);
    //this.toDate.setMonth(new Date().getMonth() + 1);
    //this.searchForm.controls['fromDate'].setValue(this.fromDate);
    //this.searchForm.controls['toDate'].setValue(this.toDate);
    console.log(this.router.url)
    if(this.router.url == '/leave/history') {
      this.title = 'Leave History';
      this.isManagePage = false;
      this.isHistoryPage = true;
      this.isLeaveToApprovePage = false;
    }

 
}

ngOnInit(): void {
  this.getLeaveData();
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

getStatusText(statusChar: string) {
  let obj = this.leaveStatus.find(o => o.value === statusChar);
  return obj;
}

viewDetails(leave: any) {
  this.router.navigate(['/leave/details', leave.id]);
}

clearForm() {
  this.searchForm.controls['empInfo'].setValue('');
  this.searchForm.controls['leaveStatus'].setValue('');
}

}
