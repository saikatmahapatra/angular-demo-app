import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';

@Component({
    selector: 'app-dashboard-stat',
    templateUrl: './dashboard-stat.component.html',
    styleUrls: ['./dashboard-stat.component.scss'],
    standalone: false
})
export class DashboardStatComponent implements OnInit {

  stats: any;
  userRoleId = 0;
  constructor(private apiSvc: ApiService, private alertSvc: AlertService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.userRoleId = this.authSvc.getRoleId();
    this.apiSvc.get(CustomAppConfig.apiUrl.dashboardStat).subscribe((response: any) => {
      this.stats = response.data;
    });
  }

}
