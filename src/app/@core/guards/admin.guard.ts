import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from 'src/app/@core/services/alert.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = new Subject<boolean>();
    this.authService.validateRolePermissions().subscribe(res => {
      if (res?.data?.roleId === '1') {
        result.next(true);
        result.complete();
      } else {
        result.next(false);
        result.complete();
        this.router.navigate(['unauthorized']);
      }
    },
      error => {
        result.next(false);
        result.complete();
        this.router.navigate(['unauthorized']);
      });
    return result.asObservable();
  }
}
