import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  news: any = [];
  itemId!: string | null;
  constructor(private apiSvc: ApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( param =>{
      this.itemId = param.get('id');
    });
    let queryParams = new HttpParams();
    if (this.itemId) {
      queryParams = queryParams.append('id', this.itemId);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getNews, options).subscribe((response: any) => {
      this.news = response?.data[0];
    });
  }

  getTimeStampInfo(item: any) {
    return 'Created on ' + item?.content_created_on + ' by ' + item?.user_firstname + ' ' + item?.user_lastname;
  }

}
