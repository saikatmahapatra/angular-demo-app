import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // dont use old http
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
@Injectable()
export class ContentService {

  private _apiBaseUrl: string = 'assets/mock_data/';

  constructor(private _http: HttpClient) { }

  getCMSContent() {
    return this._http.get(this._apiBaseUrl + 'content.json');
  }
}
