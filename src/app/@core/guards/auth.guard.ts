import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from 'src/app/@core/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let routeMessage: string = '';
    const isTokenExpired = this.authService.isTokenExpired();

    this.authService.validateToken().subscribe({
      error: (error: HttpErrorResponse) => {
        this.authService.logout();
      }
    });

    if (!isTokenExpired) {
      const isLoggedIn = this.authService.isLoggedIn();

      if (isLoggedIn) {
        return true;
      } else {
        routeMessage = "You must login to continue.";
      }
    } else {
      routeMessage = "Your session has expired."
    }

    if (routeMessage) this.alertService.error(routeMessage, false);
    //console.log(routeMessage);

    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
}
