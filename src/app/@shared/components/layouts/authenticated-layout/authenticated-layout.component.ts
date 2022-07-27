import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NavigationService } from 'src/app/@core/services/navigation.service';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss']
})
export class AuthenticatedLayoutComponent implements OnInit {
  showSideNav: Observable<any> | undefined;
  
  constructor(private navService: NavigationService) {}

  ngOnInit() {
    this.showSideNav = this.navService.getShowNav();
  }
}
