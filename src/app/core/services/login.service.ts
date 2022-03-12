import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private APIBaseURL = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  login(postData: any) {
    return this.http.post('http://localhost/angular-demo-app/server/api_server/rest/api/login', postData).pipe(
      catchError((err) => {
        err.statusText = 'This is a custom error message from angular service'+ JSON.stringify(postData);
        return throwError(err.message); //Rethrow it back to component
      })
    );
  }
}
