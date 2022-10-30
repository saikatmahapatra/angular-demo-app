import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-cms',
  templateUrl: './manage-cms.component.html',
  styleUrls: ['./manage-cms.component.scss']
})
export class ManageCmsComponent implements OnInit {
  dataRow: any;
  totalRecords: any;

  constructor(
    public apiSvc: ApiService
  ) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents() {
    this.apiSvc.get(AppConfig.apiUrl.getContents).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
    });
  }

}