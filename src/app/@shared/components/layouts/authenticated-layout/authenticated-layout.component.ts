import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/@core/services/common.service';
import { NavigationService } from 'src/app/@core/services/navigation.service';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss']
})
export class AuthenticatedLayoutComponent implements OnInit {
  showSideNav: Observable<any> | undefined;

  constructor(private navService: NavigationService, private commonSvc: CommonService) {}

  ngOnInit() {
    this.showSideNav = this.navService.getShowNav();
  }

  closeSideBar() {
    if (this.commonSvc.getScreenView() === 'small' || this.commonSvc.getScreenView() === 'min') {
      this.navService.toggleNavState();
    }
  }
}
