import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../@utils/const/app.config';
import { CommonService } from '../@core/services/common.service';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
    standalone: false
})
export class AuthLayoutComponent implements OnInit {
  imgPath = 'assets/img/7.svg';
  constructor(private commonSvc: CommonService) { 
    this.commonSvc.setTitle('Auth');
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('theme') === 'dark') {
      this.imgPath = 'assets/img/7-dark.svg';
    }
  }

  getThemeName(themeName: string) {
    if(themeName === 'dark') {
      this.imgPath = 'assets/img/7-dark.svg';
    } else {
      this.imgPath = 'assets/img/7.svg';
    }
  }

}
