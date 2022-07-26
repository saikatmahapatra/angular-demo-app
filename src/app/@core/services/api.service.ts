import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfig } from '../../@utils/const/app-config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = AppConfig.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUsersTest() {
    return this.http.get(this.apiBaseUrl + AppConfig.url.getUsers).pipe(
      catchError((err) => {
        //err.statusText = 'This is a custom error message from angular service';
        return throwError(err.message);
      })
    );
  }

  getDashboardStat() {
    return this.http.get(this.apiBaseUrl + AppConfig.url.dashboardStat).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  checkEmail(data?: any) {
    return this.http.post(this.apiBaseUrl + AppConfig.url.checkEmail, data).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

}
