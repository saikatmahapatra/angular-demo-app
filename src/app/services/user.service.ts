import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };


@Injectable()
export class UserService {
    apiBaseUrl = 'mock_data';

    constructor(private _http: HttpClient) {
    }

    getUsers() {
        return this._http.get('mock_data/user.json');
    }
}
