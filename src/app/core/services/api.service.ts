import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfig } from '../../common/const/app-config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private APIBaseURL = AppConfig.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUsersTest() {
    return this.http.get(AppConfig.apiBaseUrl + AppConfig.endPoints.getUsers).pipe(
      catchError((err) => {
        //err.statusText = 'This is a custom error message from angular service';
        return throwError(err.message);
      })
    );
  }

  getDashboardStat() {
    return this.http.get(this.APIBaseURL + 'dashboardStat').pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

}
