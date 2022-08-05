import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-dashboard-stat',
  templateUrl: './dashboard-stat.component.html',
  styleUrls: ['./dashboard-stat.component.scss']
})
export class DashboardStatComponent implements OnInit {

  stats: any;
  constructor(private apiSvc: ApiService, private alertSvc: AlertService) { }

  ngOnInit(): void {
    this.apiSvc.getDashboardStat().subscribe({
      next: (response: any) => {
        this.stats = response.data;
      }, 
      error: (err) => {
        //Over-ride error
        // if(err?.error?.message) {
        //   this.alertSvc.error(err?.error?.message, false);
        // } else {
        //   this.alertSvc.error(err.statusText, false);
        // }
      },
      complete: ()=> {
      }
    });
  }

}
