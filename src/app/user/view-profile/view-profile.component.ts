import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { addressType, userStatus } from 'src/app/@utils/const/data.array';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  userInfo: any;
  addressInfo: any;
  workExp: any;
  payrollInfo: any;
  educationInfo: any;
  emergencyContact: any;
  approvers: any;
  userGovtIds: any;
  userPhoto: any;
  orgName = 'UEIPL';
  selfAccount = false;

  constructor(private apiSvc: ApiService, private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
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
    this.apiSvc.getUserDetails(id).subscribe((response: any) => {
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
      }
    });
  }

  getAddressType(aChar: string) {
    return addressType[aChar];
  }

  deleteAddress(id: any) {
    this.apiSvc.deleteAddress(id).subscribe((response: any) => {
      if (response.status == 'success') {
        this.alertSvc.success(response.message);
        this.getProfileData();
      }
    });
  }

  deleteEducation(id: any) {
    this.apiSvc.deleteEducation(id).subscribe((response: any) => {
      if (response.status == 'success') {
        this.alertSvc.success(response.message);
        this.getProfileData();
      }
    });
  }

  deleteWorkExp(id: any) {

  }

  deletePayrollInfo(id: any) {

  }
  deleteContact(id: any) {

  }

}
