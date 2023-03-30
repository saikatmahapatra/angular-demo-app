import { HttpHeaders, HttpParams } from '@angular/common/http';
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

  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getContents();
  }
  // Pagination Config

  constructor(private apiSvc: ApiService, private commonSvc: CommonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.currentPageIndex = window.history.state?.newsPageNumber || 0;
      this.getContents();
    })

  }

  getContents() {
    let queryParams = new HttpParams();
    if (this.searchKeyword) {
      queryParams = queryParams.append('searchBy', this.searchKeyword);
    }
    let headers = new HttpHeaders();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));

    this.apiSvc.get(AppConfig.apiUrl.getNews,{ headers: headers, params: queryParams }).subscribe((response: any) => {
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
    this.getContents();
  }
}
