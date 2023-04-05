import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from 'src/app/@core/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let userRole = null;
    this.authService.validateRolePermissions().subscribe({
      next: (response: any) => {
        userRole = response?.data?.roleId;
      }
    });
    if (userRole === '1') {
      return true;
    } else { 
      this.authService.logout();
      this.router.navigate(['unauthorized']);
      return false; 
    }
  }
}
