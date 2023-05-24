import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { addressType, userStatus } from 'src/app/@utils/const/data.array';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  userInfo: any;
  addressInfo: any = [];
  workExp: any = [];
  payrollInfo: any = [];
  educationInfo: any = [];
  emergencyContact: any = [];
  approvers: any = [];
  userGovtIds: any ;
  userPhoto: any;
  leaveBalance: any = [];
  orgName = 'UEIPL';
  selfAccount = false;
  routedFromPageIndex = 0;

  constructor(private apiSvc: ApiService, private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.routedFromPageIndex = history.state['manageUserPageIndex'] || 0;
    this.getProfileData();
  }

  getProfileData() {
    let userId = null;
    this.activatedRoute.paramMap.subscribe(params => {
      //console.log('params =', params);
      userId = params.get('id');
      this.getProfile(userId);
    })
  }

  getProfile(id?: any) {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append('id', id);
    }
    queryParams = queryParams.append('pageName', 'viewEmpProfile');
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.userDetails, options).subscribe((response: any) => {
      if (response.status == 'success') {
        //console.log(response?.data);
        this.userInfo = response?.data?.user[0];
        this.addressInfo = response?.data?.address;
        this.workExp = response?.data?.workExp;
        this.payrollInfo = response?.data?.payrollInfo;
        this.educationInfo = response?.data?.education;
        this.emergencyContact = response?.data?.econtact;
        this.userGovtIds = response?.data?.userGovtIds;
        this.userPhoto = response?.data?.profilePic;
        this.selfAccount = response?.data?.selfAccount;
        this.approvers = response?.data?.approvers[0] || [];
        this.leaveBalance = response?.data?.leaveBalance?.data_rows[0] || [];
      }
    });
  }

  getAddressType(aChar: string) {
    return addressType[aChar];
  }

  deleteAddress(id: any) {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append('id', id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.delete(AppConfig.apiUrl.deleteAddress, options).subscribe((response: any) => {
      this.alertSvc.success(response.message);
      this.getProfileData();
    });
  }

  deleteEducation(id: any) {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append('id', id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.delete(AppConfig.apiUrl.deleteEducation, options).subscribe((response: any) => {
      this.alertSvc.success(response.message);
      this.getProfileData();
    });
  }

  deleteWorkExp(id: any) {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append('id', id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.delete(AppConfig.apiUrl.deleteExperience, options).subscribe((response: any) => {
      this.alertSvc.success(response.message);
      this.getProfileData();
    });
  }

  deletePayrollInfo(id: any) {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append('id', id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.delete(AppConfig.apiUrl.deletePayroll, options).subscribe((response: any) => {
      this.alertSvc.success(response.message);
      this.getProfileData();
    });
  }

  deleteContact(id: any) {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append('id', id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.delete(AppConfig.apiUrl.deleteEmergencyContact, options).subscribe((response: any) => {
      this.alertSvc.success(response.message);
      this.getProfileData();
    });
  }

  navigateTo(routeLink: any) {
    const navigationExtras: NavigationExtras = {
      state: {manageUserPageIndex: this.routedFromPageIndex},
    };
    this.router.navigate(routeLink, navigationExtras);
  }

}
