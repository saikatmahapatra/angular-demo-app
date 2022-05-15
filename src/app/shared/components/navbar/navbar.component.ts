import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn();
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/']);
  }


}
