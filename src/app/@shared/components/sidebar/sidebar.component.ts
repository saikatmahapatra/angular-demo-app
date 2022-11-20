import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/@core/services/common.service';
import { NavigationService } from 'src/app/@core/services/navigation.service';
import { SideNavDirection } from 'src/app/@utils/enums/side-nav-direction';
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
  constructor(private navService: NavigationService, private commonSvc: CommonService) { }

  ngOnInit(): void {
    //this.showSideNav = this.navService.getShowNav();
  }

  // onSidebarClose() {
  //   this.navService.setShowNav(false);
  // }

  // getSideNavBarStyle(showNav: any) {
  //   let navBarStyle: any = {};
  //   navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
  //   navBarStyle.width = this.navWidth + 'px';
  //   navBarStyle[this.direction] = (showNav ? 0 : (this.navWidth * -1)) + 'px';
  //   return navBarStyle;
  // }

  closeSideBar() {
    if (this.commonSvc.getScreenView() === 'small' || this.commonSvc.getScreenView() === 'min') {
      this.navService.toggleNavState();
    }
  }

}
