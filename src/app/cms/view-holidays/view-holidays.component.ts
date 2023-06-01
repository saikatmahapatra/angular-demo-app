import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-view-holidays',
  templateUrl: './view-holidays.component.html',
  styleUrls: ['./view-holidays.component.scss']
})
export class ViewHolidaysComponent implements OnInit {
  startYear: number = 2019;
  endYear: number = new Date().getFullYear() + 1;
  dataRow: any;
  selectedYear: number = new Date().getFullYear();
  yearList: any = [];
  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 10;
  itemPerPageDropdown = [10, 20, 30, 50];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getHolidays();
  }
  // Pagination Config
  constructor(
    public apiSvc: ApiService,
    private alertSvc: AlertService
  ) {

   }

  ngOnInit(): void {
    for(let y = this.startYear; y <= this.endYear; y++) {
      this.yearList.push(y);
    }
    this.getHolidays();
  }

  getHolidays() {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if(this.selectedYear) {
      params = params.append('year', this.selectedYear)
    }
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.apiSvc.get(AppConfig.apiUrl.getHolidays, { headers: headers, params: params }).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
    });
  }

  yearChange() {
    this.getHolidays();
  }
}
