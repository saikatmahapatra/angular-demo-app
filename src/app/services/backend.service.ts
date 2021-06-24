import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private APIBaseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getCMSContent() {
    return this.http.get(this.APIBaseURL + 'posts');
  }

  getUsers() {
    return this.http.get(this.APIBaseURL + 'users');
  }

  createUsers(data) {
    return this.http.post(this.APIBaseURL + 'users', data);
  }

}
