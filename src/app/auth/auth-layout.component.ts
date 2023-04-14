import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../@utils/const/app.config';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  imgPath = 'assets/img/7.svg';
  isProd = AppConfig.production;

  constructor() { 
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
