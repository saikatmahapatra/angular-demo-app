import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-timesheet',
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.scss']
})
export class ViewTimesheetComponent implements OnInit {
  // timesheetData: any = [];
  // rowData$!: Observable<any[]>;

  @Input() timeSheetLogData: any;

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    //this.getTimesheetData();
  }

  // getTimesheetData() {
  //   this.activatedRoute.queryParams.subscribe(params => {
  //     const month = params['month'];
  //     const year = params['year'];
  //     let queryParams = new HttpParams();
  //     queryParams = queryParams.append('userId', this.authSvc.getUserId());
  //     if (month && year) {
  //       queryParams = queryParams.append('month', month);
  //       queryParams = queryParams.append('year', year);
  //     }

  //     let options = { params: queryParams };
  //     this.apiSvc.get(AppConfig.apiUrl.getTimesheet, options).subscribe((response: any) => {
  //       this.timesheetData = response?.data?.data_rows;
  //     });
  //   });
  // }
}
