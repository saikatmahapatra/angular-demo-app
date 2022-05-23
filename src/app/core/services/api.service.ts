import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private APIBaseURL = 'http://localhost/angular-demo-app/server/ci-api-server/api/v1/';

  constructor(private http: HttpClient) {
    
   }

  getCMSContent() {
    return this.http.get(this.APIBaseURL + 'posts');
  }

  getUsers() {
    return this.http.get(this.APIBaseURL + 'users');
  }

  createUsers(data: any) {
    return this.http.post(this.APIBaseURL + 'users', data);
  }

  getUsersTest() {
    const auth_token = JSON.parse(sessionStorage.getItem('token') || '');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${auth_token}`);
    const requestOptions = { headers: headers };
    return this.http.get(this.APIBaseURL + 'users', requestOptions).pipe(
      catchError((err) => {
        err.statusText = 'This is a custom error message from angular service';
        return throwError(err.message); //Rethrow it back to component
      })
    );
  }
}
