import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { NavigationService } from 'src/app/@core/services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authSvc: AuthService, private navService: NavigationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn();
  }
  
  toggleSideNav() {
    this.navService.setShowNav(true);
  }
}
