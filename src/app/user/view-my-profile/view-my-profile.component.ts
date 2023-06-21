import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { addressType, userStatus } from 'src/app/@utils/const/data.array';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-my-profile.component.html',
  styleUrls: ['./view-my-profile.component.scss']
})
export class ViewMyProfileComponent implements OnInit {
  userInfo: any;
  addressInfo: any;
  workExp: any;
  payrollInfo: any;
  educationInfo: any;
  emergencyContact: any;
  approvers: any = [];
  userGovtIds: any;
  userPhoto: any;
  orgName = 'UEIPL';
  selfAccount = false;
  leaveBalance: any = [];

  constructor(
    private apiSvc: ApiService,
    private commonSvc: CommonService,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.commonSvc.setTitle('My Profile');
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pageName', 'myProfile');
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.userDetails, options).subscribe((response: any) => {
      if (response.status == 'success') {
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

  navigateTo(routeLink: any) {
    this.router.navigate(routeLink);
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
      this.getProfile();
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
      this.getProfile();
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
      this.getProfile();
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
      this.getProfile();
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
      this.getProfile();
    });
  }

}
