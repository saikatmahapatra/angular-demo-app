import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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

  authenticate(postData: any) {
    return this.http.post('http://localhost/united-emp-portal/api/login', postData).pipe(
      catchError((err) => {
        //err.statusText = err?.error?.data?.message;
        return throwError(err); //Rethrow it back to component
      })
    );
  }
}
