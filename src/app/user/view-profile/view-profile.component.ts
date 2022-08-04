import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let userId = null;
    this.activatedRoute.paramMap.subscribe(params => {
      //console.log('params =', params);
      userId = params.get('id');
      this.getProfile(userId);
    })
    
  }

  getProfile(id?: any) {
    this.apiSvc.getUserDetails(id).subscribe({
      next: (response: any) => {
        if(response.status == 'success') {
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
        if(response.status == 'error') {
          this.alertSvc.error(response.message);
        }
      }, 
      error: (err) => {
        this.alertSvc.error(err?.error?.message);
      },
      complete: ()=> {
      }
    });
  }

  getAddressType(aChar: string) {
    return addressType[aChar];
  }

  deleteAddress(id: any) {
    
  }

  deleteEducation(id: any) {
    
  }

  deleteWorkExp(id: any) {
    
  }

  deletePayrollInfo(id: any) {

  }
  deleteContact(id: any) {

  }

}
