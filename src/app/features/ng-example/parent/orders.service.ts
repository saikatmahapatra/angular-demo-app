import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // dont use old http
import { Observable, Subject } from 'rxjs';
@Injectable()
export class OrdersService {

  private totalAddedQtySource = new Subject<any>(); // source
  totalAddedQtyToDisplay$ = this.totalAddedQtySource.asObservable(); // stream

  constructor() { }

  notifyAddToCart(qty: number) {
    this.totalAddedQtySource.next(qty);
    console.log(qty, this.totalAddedQtyToDisplay$);
  }

}
