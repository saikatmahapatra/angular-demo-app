import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // dont use old http
import { Observable } from "rxjs";






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
