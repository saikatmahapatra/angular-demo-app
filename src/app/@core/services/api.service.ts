import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfig } from '../../@utils/const/app.config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = AppConfig.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getUsersTest() {
    return this.http.get(this.apiBaseUrl + AppConfig.apiResource.getUsers).pipe(
      catchError((err) => {
        //err.statusText = 'This is a custom error message from angular service';
        return throwError(err.message);
      })
    );
  }

  getDashboardStat() {
    return this.http.get(this.apiBaseUrl + AppConfig.apiResource.dashboardStat).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  checkEmail(data?: any) {
    return this.http.post(this.apiBaseUrl + AppConfig.apiResource.checkEmail, data).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  getUserFormData() {
    return this.http.get(this.apiBaseUrl + AppConfig.apiResource.userFormData).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  addUser(data: any) {
    return this.http.post(this.apiBaseUrl + AppConfig.apiResource.addUser, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  getUserDetails(userId?: any) {
    let params = new HttpParams();
    //params.set('userId', userId);
    return this.http.post(this.apiBaseUrl + AppConfig.apiResource.userDetails, {'userId': userId}).pipe(
      catchError((err) => {
        return throwError(err.message);
      })
    );
  }

  changePassword(data: any) {
    return this.http.post(this.apiBaseUrl + AppConfig.apiResource.changePassword, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  createAddress(data: any) {
    return this.http.post(this.apiBaseUrl + AppConfig.apiResource.addAddress, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  getAddress(id: any) {
    return this.http.get(this.apiBaseUrl + AppConfig.apiResource.getAddress + '/' + id).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  updateAddress(data: any) {
    return this.http.put(this.apiBaseUrl + AppConfig.apiResource.updateAddress , data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  deleteAddress(id: string) {
    // const options = {
    //   body: {
    //     id: id
    //   }
    // };
    return this.http.delete(this.apiBaseUrl + AppConfig.apiResource.deleteAddress + '/' + id).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  getUserData(id: string) {
    return this.http.get(this.apiBaseUrl + AppConfig.apiResource.userData + '/' + id).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  updateUserData(data: any) {
    return this.http.patch(this.apiBaseUrl + AppConfig.apiResource.updateUserData, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    )
  }

}
