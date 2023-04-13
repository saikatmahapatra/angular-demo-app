import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConfig } from '../../@utils/const/app.config';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject!: BehaviorSubject<any>;
  public loggedInUser!: Observable<any>;

  constructor(private http: HttpClient, private router: Router,
    private alertSvc: AlertService) {
    const loggedInData: any = sessionStorage.getItem('loginData');
    this.loggedInUserSubject = new BehaviorSubject<any>(JSON.parse(loggedInData));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  isTokenExpired() {
    return false;
  }

  isLoggedIn() {
    const authToken = this.getToken();
    return (authToken !== null) ? true : false;
  }

  authenticate(postData: any) {
    return this.http.post<any>(AppConfig.apiBaseUrl + AppConfig.apiUrl.authenticate, postData)
      .pipe(map(response => {
        sessionStorage.setItem('loginData', JSON.stringify(response.data));
        sessionStorage.setItem('access_token', response.token);
        this.loggedInUserSubject.next(response.data);
        return response.data;
      }), catchError((err) => {
        //err.statusText = err?.error?.data?.message;
        return throwError(err); //Rethrow it back to component
      }));
  }

  getToken() {
    return sessionStorage.getItem('access_token');
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('loginData') || '') || {};
  }

  logout() {
    sessionStorage.clear();
    //localStorage.clear();
    this.loggedInUserSubject.next(null);
    this.alertSvc.info('You have been logged out!', true);
    this.router.navigate(['auth/login']);
  }

  validateToken() {
    return this.http.get(AppConfig.apiBaseUrl + AppConfig.apiUrl.validateToken);
  }

  validateRolePermissions() {
    return this.http.get<any>(AppConfig.apiBaseUrl + AppConfig.apiUrl.validateRolePermissions);
  }

  getUserId() {
    const user = JSON.parse(sessionStorage.getItem('loginData') || '') || {};
    return user.id;
  }

  getRoleId() {
    const user = JSON.parse(sessionStorage.getItem('loginData') || '') || {};
    return user.user_role;
  }

  checkUSerRole() {

  }
}
