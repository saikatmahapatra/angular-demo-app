import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private APIBaseURL = 'http://localhost:7878/';

  constructor(private http: HttpClient) { }

  getCMSContent() {
    return this.http.get(this.APIBaseURL + 'content');
  }

  getUsers() {
    return this.http.get(this.APIBaseURL + 'user');
  }

}
