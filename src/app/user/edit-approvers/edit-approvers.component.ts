import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-edit-approvers',
  templateUrl: './edit-approvers.component.html',
  styleUrls: ['./edit-approvers.component.scss']
})
export class EditApproversComponent implements OnInit {
  data: any;
  currentApprovers: any;

  constructor(
    private apiSvc: ApiService
  ) { }

  ngOnInit(): void {
    this.apiSvc.get(AppConfig.apiUrl.approvers).subscribe((response: any) => {
      this.currentApprovers = response?.data[0];
    });
  }


  getSearchInputVal(str: string) {
    let queryParams = new HttpParams();
    let postData = { keywords: str, action: 'search' };
    this.apiSvc.post(AppConfig.apiUrl.searchUser, postData).subscribe((response: any) => {
      this.data = response?.data;
    });
  }

}
