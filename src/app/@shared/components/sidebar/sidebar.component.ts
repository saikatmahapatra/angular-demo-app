import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { NavigationService } from 'src/app/@core/services/navigation.service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
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
  sideBarMenuItems: any = [];
  constructor(private navService: NavigationService, private commonSvc: CommonService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authSvc.getRoleId();
    this.loggedInUserId = this.authSvc.getUserId();
    const user = this.authSvc.getUser();
    this.welcomeUserText = user.user_full_name;

    this.sideBarMenuItems = [
      {
        id: 1,
        label: "Getting Started",
        icon: "home",
        isAdminMenu: false,
        items: [
          { id: 1, label: "Dashboard", icon: "", url: ["/dashboard"] },
          { id: 2, label: "Analytics", icon: "", url: ["/dashboard/my-analytics/emp/", this.loggedInUserId] }
        ]
      },
      {
        id: 2,
        label: "Admin Menu",
        icon: "admin",
        isAdminMenu: true,
        items: [
          { id: 1, label: "Manage Employees", icon: "", url: ["/emp/manage"] },
          // { id: 119, label: "Add New Employee", icon: "", url: ["/emp/add"] },
          { id: 2, label: "Manage Contents", icon: "", url: ["/cms/manage-cms"] },
          { id: 3, label: "Manage Holidays", icon: "", url: ["/cms/holiday-management"] },
          { id: 4, label: "Manage Leave Applications", icon: "", url: ["/leave/manage"] },
          { id: 5, label: "View & Upload Leave Balance", icon: "", url: ["/leave/balance"] },
          { id: 6, label: "Timesheet Report", icon: "", url: ["/timesheet/report"] },
          { id: 7, label: "Manage Projects", icon: "", url: ["/project/manage-project"] },
          { id: 8, label: "Manage Tasks", icon: "", url: ["/project/manage-tasks"] },
          // { id: 9, label: "Asset Management", icon: "", url: ["/asset-management"] },
          { id: 10, label: "Settings", icon: "", url: ["/settings"] }
        ]
      },
      {
        id: 3,
        label: "My Tasks",
        icon: "tasks",
        isAdminMenu: false,
        items: [
          { id: 1, label: "Manage Leave Applications", icon: "", url: ["/leave/requests-to-approve"] }
        ]
      },
      {
        id: 4,
        label: "Self Services",
        icon: "selfService",
        isAdminMenu: false,
        items: [
          { id: 1, label: "Log Timesheet", icon: "", url: ["/timesheet/log-work"] },
          { id: 2, label: "Change Workflow Approvers", icon: "", url: ["/emp/change-approvers"] },
          { id: 3, label: "Apply Leave", icon: "", url: ["/leave/apply"] },
          { id: 4, label: "Leave History", icon: "", url: ["/leave/history"] }
        ]
      },
      {
        id: 5,
        label: "Organization",
        icon: "globe",
        isAdminMenu: false,
        items: [
          { id: 1, label: "Employees", icon: "", url: ["/emp/view-employees"] },
          { id: 2, label: "My Reportees", icon: "", url: ["/emp/view-reportees"] },
          { id: 3, label: "Holidays", icon: "", url: ["/cms/holiday-calendar"] }
        ]
      },
      {
        id: 6,
        label: "My Account",
        icon: "user",
        isAdminMenu: false,
        items: [
          { id: 1, label: "My Profile", icon: "", url: ["/emp/my-profile"] },
          { id: 2, label: "Change Password", icon: "", url: ["/emp/change-password"] },
          { id: 3, label: "Logout", icon: "", url: ["/auth/logout"] }
        ]
      },
    ];
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
