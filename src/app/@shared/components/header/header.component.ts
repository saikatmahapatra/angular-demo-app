import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { CommonService } from 'src/app/@core/services/common.service';
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
  isOpened = true;
  resolution = 'lg';
  constructor(private authSvc: AuthService, private navService: NavigationService, private commonSvc: CommonService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn();
    this.user = this.authSvc.getUser();
    this.resolution = this.commonSvc.getScreenResolutionBreakPoint()
  }

  toggleSideNav() {
    this.navService.showNav$.subscribe((data)=>{
      this.isOpened = data;
    });
    if(!this.isOpened) {
      this.navService.showNav();
    } else {
      this.navService.hideNav();
    }
  }
}
