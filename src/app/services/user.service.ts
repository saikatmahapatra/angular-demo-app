import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };


@Injectable()
export class UserService {
    apiBaseUrl: string = 'assets/mock_data/';
    constructor(private _http: HttpClient) {
    }

    getUsers() {
        return this._http.get(this.apiBaseUrl+'user.json');
    }
}
