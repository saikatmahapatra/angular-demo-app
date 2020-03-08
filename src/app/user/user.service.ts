import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // dont use old http
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' });
// };


@Injectable()
export class UserService {
    private _apiBaseUrl: string = 'assets/api_mock_data/';

    constructor(private _http: HttpClient) { }

    getUsers() {
        return this._http.get(this._apiBaseUrl + 'user.json');
    }
}
