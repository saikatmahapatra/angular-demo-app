import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, Input } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: any = [];
  searchKeyword: string = '';

  //ngx-pagination
  p: number = 1;

  constructor(private apiSvc: ApiService, private commonSvc: CommonService) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents() {
    let queryParams = new HttpParams();
    if (this.searchKeyword) {
      queryParams = queryParams.append('searchBy', this.searchKeyword);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getNews, options).subscribe((response: any) => {
      this.news = response?.data['data_rows'];
      this.searchKeyword = '';
    });
  }

  getTimeStampInfo(item: any) {
    return 'Created by ' + item?.user_firstname + ' ' + item?.user_lastname + ' on ' + item?.content_created_on;
  }

  getSearchKeyword(str: string) {
    this.searchKeyword = str;
    this.getContents();
  }

}
