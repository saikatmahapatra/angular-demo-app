import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { NavigationService } from 'src/app/@core/services/navigation.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // showSideNav: Observable<any> | undefined;
  // @Input() sidenavTemplateRef: any;
  // @Input() duration: number = 0.25;
  // @Input() navWidth: number = window.innerWidth;
  // @Input() direction: SideNavDirection = SideNavDirection.Left;
  userRole = '';
  loggedInUserId = '';
  welcomeUserText = '';
  constructor(private navService: NavigationService, private commonSvc: CommonService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authSvc.getRoleId();
    this.loggedInUserId = this.authSvc.getUserId();
    const user = this.authSvc.getUser();
    this.welcomeUserText = user.user_full_name;
  }

  transform(value: string, size: number = 10): string {
    if (!value) {
      return '';
    }
    const limit = size > 0 ? size : 10;
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

  closeSideBar() {
    if (this.commonSvc.getScreenResolutionBreakPoint() === 'xs' || this.commonSvc.getScreenResolutionBreakPoint() === 'sm' || this.commonSvc.getScreenResolutionBreakPoint() === 'md') {
      this.navService.toggleNavState();
    }
  }

}
