import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private APIBaseURL = 'http://localhost:3000/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods':'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
  }
  
  constructor(private http: HttpClient) { }

  login(postData: any) {
    return this.http.post('http://localhost/angular-demo-app/server/api_server/api/login', postData, this.httpOptions).pipe(
      catchError((err) => {
        err.statusText = 'This is a custom error message from angular service'+ JSON.stringify(postData);
        return throwError(err.message); //Rethrow it back to component
      })
    );
  }
}
