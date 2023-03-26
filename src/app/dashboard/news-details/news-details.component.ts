import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/@core/services/common.service';
import { AuthService } from 'src/app/@core/services/auth.service';
@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  news: any = [];
  itemId!: string | null;
  paginationPageNumber!: string | null;
  constructor(private apiSvc: ApiService,
    private activatedRoute: ActivatedRoute,
    private commonSvc: CommonService,
    private authSvc: AuthService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.itemId = param.get('id');
      this.paginationPageNumber = window.history.state.newsPageNumber;
    });
    let queryParams = new HttpParams();
    if (this.itemId) {
      queryParams = queryParams.append('id', this.itemId);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getNews, options).subscribe({
      next: (response: any) => {
        this.news = response?.data['data_rows'][0];
      },
      error: () => {

      },
      complete: () => {
        this.markAsRead();
      }
    });
  }

  getTimeStampInfo(item: any) {
    return 'Published approximately ' + this.commonSvc.getTimeAgo(item?.content_created_on) + ' by ' + item?.user_firstname + ' ' + item?.user_lastname;
  }

  markAsRead() {
    const data = { id: this.itemId, postType: 'post', userId: this.authSvc.getUserId() };
    this.apiSvc.put(AppConfig.apiUrl.markAsRead, data).subscribe({
      next: (response: any) => {
        console.log(response);
      }
    })
  }

}
