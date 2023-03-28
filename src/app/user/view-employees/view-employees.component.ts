import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss']
})
export class ViewEmployeesComponent implements OnInit {
  public empList: any = [];
  loading: boolean = true;

  constructor(
    private apiSvc: ApiService, 
    private commonSvc: CommonService, 
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getEmpList();
  }

  getEmpList() {
    this.apiSvc.get(AppConfig.apiUrl.getEmployees).subscribe({
      next: (val: any) => {
        this.empList = val?.data;
        this.loading = false;
      }
    });
  }

}
