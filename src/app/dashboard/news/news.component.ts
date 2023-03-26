import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  searchKeyword: string = ''; // from search input
  resetSearchInput = false;

  currentPage: number = 0;
  itemPerPage: number = 10;
  totalRecords: number = 0;

  constructor(private apiSvc: ApiService, private commonSvc: CommonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.currentPage = window.history.state?.newsPageNumber || 0;
      this.getContents();
    })

  }

  getContents() {
    let queryParams = new HttpParams();
    if (this.searchKeyword) {
      queryParams = queryParams.append('searchBy', this.searchKeyword);
    }
    //pagination calc
    queryParams = queryParams.append('page', this.currentPage + 1);
    queryParams = queryParams.append('perPage', this.itemPerPage);
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getNews, options).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.news = response?.data['data_rows'];
    });
  }

  getTimeStampInfo(item: any) {
    return this.commonSvc.getTimeAgo(item?.content_created_on);
  }

  getSearchInputVal(str: string) {
    this.searchKeyword = str;
    this.resetSearchInput = true;
    this.currentPage = 1;
    this.getContents();
  }

  onPageChange(event: any) {
    console.log(event);
    this.currentPage = event.page;
    this.itemPerPage = event.rows;
    this.getContents();
  }
}
