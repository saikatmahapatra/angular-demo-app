import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/@core/services/common.service';
import { AuthService } from 'src/app/@core/services/auth.service';
@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss'],
    standalone: false
})
export class PostDetailsComponent implements OnInit {
  post: any = [];
  itemId!: string | null;
  paginationPageNumber!: string | null;
  constructor(
    private commonSvc: CommonService, 
    private apiSvc: ApiService,
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService
    ) { 
      this.commonSvc.setTitle('Post Details');
      
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.itemId = param.get('id');
      this.paginationPageNumber = window.history.state.newsPageNumber;
    });
    let queryParams = new HttpParams();
    if (this.itemId) {
      queryParams = queryParams.append('id', this.itemId);
    }
    queryParams = queryParams.append('pageName', 'dashboardPosts');
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(CustomAppConfig.apiUrl.getPosts, options).subscribe({
      next: (response: any) => {
        this.post = response?.data['data_rows'][0];
      },
      error: () => {

      },
      complete: () => {
        //this.markAsRead();
      }
    });
  }

  getTimeStampInfo(item: any) {
    return this.commonSvc.getTimeAgo(item?.content_created_on) + ' by ' + item?.user_full_name;
  }

  markAsRead() {
    const data = { id: this.itemId, postType: 'post', userId: this.authSvc.getUserId() };
    this.apiSvc.put(CustomAppConfig.apiUrl.markAsRead, data).subscribe({
      next: (response: any) => {
        console.log(response);
      }
    })
  }

}
