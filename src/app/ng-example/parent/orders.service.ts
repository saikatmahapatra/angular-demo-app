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
export class OrdersService {

  constructor() { }

  gerOrders(){
    return "You have 10 orders";
  }

}
