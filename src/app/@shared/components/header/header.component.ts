import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { NavigationService } from 'src/app/@core/services/navigation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  productName = AppConfig.productName;
  user: any;
  isProd = AppConfig.production;
  constructor(private authSvc: AuthService, private navService: NavigationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn();
    this.user = this.authSvc.getUser();
  }

  toggleSideNav() {
    let isOpened = false;
    this.navService.showNav$.subscribe((data)=>{
      isOpened = data;
    });
    if(!isOpened) {
      this.navService.setShowNav(true);
    } else {
      this.navService.setShowNav(false);
    }
  }
}
