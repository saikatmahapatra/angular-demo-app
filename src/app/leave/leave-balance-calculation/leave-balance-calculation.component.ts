import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-leave-balance-calculation',
  templateUrl: './leave-balance-calculation.component.html',
  styleUrls: ['./leave-balance-calculation.component.scss']
})
export class LeaveBalanceCalculationComponent implements OnInit {

  dataRow = [];
  loading = false;

  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 100;
  itemPerPageDropdown = [10, 20, 30, 50, 100];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getLeaveBalance();
  }
  // Pagination Config
  constructor(
    private apiSvc: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLeaveBalance();
  }

  getLeaveBalance() {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.apiSvc.get(AppConfig.apiUrl.getEmpLeaveBalance, { headers: headers }).subscribe({
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

  editUserProfile(id: number) {
    this.router.navigate(['/emp/edit', id]);
  }

}
