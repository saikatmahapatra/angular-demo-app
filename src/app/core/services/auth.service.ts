import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConfig } from '../config/app-config';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private loggedInUserSubject!: BehaviorSubject<any>;
    public loggedInUser!: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
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

  login(postData: any) {
    return this.http.post<any>(AppConfig.API_BASE_URL + 'login', postData)
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

  getLogedInUserDetails() {
    return this.loggedInUserSubject;
  }

  logout() {
    sessionStorage.removeItem('loginData');
    sessionStorage.removeItem('access_token');
    this.loggedInUserSubject.next(null);
    this.router.navigate(['auth/login']);
  }
}
