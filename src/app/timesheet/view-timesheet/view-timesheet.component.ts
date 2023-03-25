import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
@Component({
  selector: 'app-view-timesheet',
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.scss']
})
export class ViewTimesheetComponent implements OnInit {
  // timesheetData: any = [];
  // rowData$!: Observable<any[]>;

  @Input() timeSheetLogData: any;
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  @Output() recordDeleted = new EventEmitter<boolean>(false);


  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertSvc: AlertService

  ) { }

  ngOnInit(): void {
    //this.getTimesheetData();
  }

  disableButtons(data: string) {
    const date = data.split('-');
    return !(Number(date[0]) == this.currentYear && Number(date[1]) == this.currentMonth);
  }

  editItem(id: string) {
    this.router.navigate(['timesheet/edit-timesheet', id]);
  }

  deleteItem(id: string, date: string) {
    let queryParams = new HttpParams();
    if (id) {
      queryParams = queryParams.append('id', id);
    }
    if (date) {
      queryParams = queryParams.append('date', date);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.delete(AppConfig.apiUrl.deleteTimesheet, options).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.alertSvc.success(response.message);
          this.recordDeleted.emit(true);
        }
      },
      error: (err: HttpErrorResponse) => {
      },
      complete: () => {
      }
    });
  }
}