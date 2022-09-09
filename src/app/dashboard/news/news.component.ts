import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: any = [];

  constructor(private apiSvc: ApiService) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents() {
    this.apiSvc.get(AppConfig.apiUrl.getNews).subscribe((response: any) => {
      this.news = response?.data['data_rows'];
    });
  }

  getTimeStampInfo(item: any) {
    return 'Created by ' + item?.user_firstname + ' ' + item?.user_lastname;
  }

}
