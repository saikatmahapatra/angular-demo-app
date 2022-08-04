import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AddressType } from 'src/app/@utils/enums/address-type';
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
  
  constructor(private apiSvc: ApiService, private alertSvc: AlertService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.apiSvc.getUserDetails().subscribe({
      next: (response: any) => {
        if(response.status == 'success') {
          console.log(response?.data);
          this.userInfo = response?.data?.user[0];
          this.addressInfo = response?.data?.address;
          this.workExp = response?.data?.workExp;
          this.payrollInfo = response?.data?.payrollInfo;
          this.educationInfo = response?.data?.education;
          this.emergencyContact = response?.data?.econtact;
          this.userGovtIds = response?.data?.userGovtIds;
          this.userPhoto = response?.data?.profilePic;
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
    let dataCity: any = {'P' : 'Permanent Address', 'C' : 'Present Address'};
    return dataCity[aChar];
  }

  deleteAddress(id: any) {
    
  }

}
