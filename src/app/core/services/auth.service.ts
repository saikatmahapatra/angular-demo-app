import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
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
    let isLoggedIn = false;
    const loginData = sessionStorage.getItem('loginData');
    if(loginData !== null) {
      const data = JSON.parse(loginData);
      if(data.id && data.user_email) {
        isLoggedIn = true;
      }
    }
    return isLoggedIn;
  }

  login(postData: any) {
    return this.http.post<any>('http://localhost/united-emp-portal/api/v1/login', postData)
      .pipe(map(response => {
          sessionStorage.setItem('loginData', JSON.stringify(response.data));
          this.loggedInUserSubject.next(response.data);
          return response.data;
      }), catchError((err) => {
        //err.statusText = err?.error?.data?.message;
        return throwError(err); //Rethrow it back to component
      }));
  }

  getLogedInUserDetails() {
    return this.loggedInUserSubject;
  }

  logout() {
    sessionStorage.removeItem('loginData');
    this.loggedInUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
