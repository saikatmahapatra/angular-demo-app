import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../@core/services/common.service';
import { ApiService } from '../../@core/services/api.service';
import { AlertService } from 'src/app/@core/services/alert.service';
import { of, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  providers: [ApiService]
})
export class ManageUsersComponent implements OnInit {

  public saveUserForm!: UntypedFormGroup;
  public submitted!: boolean;
  public events: any[] = [];
  public userList: any;
  public postData = {};
  subscription !: Subscription;
  loading: boolean = true;
  showTableDataLoading = false;

  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 10;
  itemPerPageDropdown = [10, 20, 30, 50, 100, 150, 200];
  searchKeyword: any = '';
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getUsersList();
  }
  // Pagination Config

  constructor(
    private apiSvc: ApiService, 
    public formBuilder: UntypedFormBuilder, 
    private commonSvc: CommonService, 
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.currentPageIndex = window.history.state?.manageUserPageIndex || 0;
      this.first = this.currentPageIndex * this.itemPerPage;
      this.getUsersList();
    })
    
  }

  getUsersList() {
    let headers = new HttpHeaders();
    let queryParams = new HttpParams();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    if(this.searchKeyword.trim()) {
      queryParams = queryParams.append('keywords', this.searchKeyword.trim());
    }
    let options = { headers: headers, params: queryParams };
    this.showTableDataLoading = true;
    this.apiSvc.get(AppConfig.apiUrl.getUsers, options).subscribe({
      next: (val: any) => {
        this.totalRecords = val?.data?.num_rows;
        this.userList = val?.data?.data_rows;
        this.loading = false;
        this.showTableDataLoading = false;
      }
    });
  }

  // getUserInterval() {
  //   this.subscription = timer(0, 10000).pipe(
  //     switchMap(() => this.apiSvc.get(AppConfig.apiUrl.getUsers))
  //   ).subscribe((val: any) => {
  //     this.userList = val?.data?.data_rows;
  //   });
  // }

  redirectToProfile(id: number) {
    const navigationExtras: NavigationExtras = {
      state: {manageUserPageIndex: this.currentPageIndex},
    };
    this.router.navigate(['/emp/view-emp-profile', id], navigationExtras);
  }

  redirectToDataChart(id: number) {
    const navigationExtras: NavigationExtras = {
      state: {manageUserPageIndex: this.currentPageIndex},
    };
    this.router.navigate(['/emp/data-analysis-chart', id], navigationExtras);
  }

  editUserProfile(id: number) {
    const navigationExtras: NavigationExtras = {
      state: {manageUserPageIndex: this.currentPageIndex},
    };
    this.router.navigate(['/emp/edit', id], navigationExtras);
  }

  getSearchKeyword(str: string) {
    this.searchKeyword = str;
    this.resetPagination();
    this.getUsersList();
  }

  resetPagination() {
    this.currentPageIndex = 0;
    this.totalRecords = 0;
    this.itemPerPage = 10;
    this.first = 0;
  }

}
