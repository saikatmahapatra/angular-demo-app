import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // dont use old http
import { Observable } from "rxjs";






@Injectable()
export class GlobalDataService {

  private apiBaseUrl: string = 'http://localhost:7878/';

  constructor(private http: HttpClient) { }

  getCMSContent() {
    return this.http.get(this.apiBaseUrl + 'content');
  }

  getUsers() {
    return this.http.get(this.apiBaseUrl + 'user');
  }

}
