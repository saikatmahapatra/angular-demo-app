import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { addressType, userStatus } from 'src/app/@utils/const/data.array';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  userInfo: any;
  addressInfo: any = [];
  workExp: any = [];
  payrollInfo: any = [];
  educationInfo: any = [];
  emergencyContact: any = [];
  approvers: any = [];
  userGovtIds: any;
  userPhoto: any;
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
      }
    });
  }
}
