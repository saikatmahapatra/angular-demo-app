import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    standalone: false
})
export class EmployeeComponent implements OnInit {

  showShubhead = true;
  constructor() { }

  ngOnInit() {
    this.simpleObservable();
    const Ob = this.arrayToObservableWrap();

    //Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
    Ob.subscribe(observer => {
      console.log("Subscription 1 : ", observer);
    })
    //Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
    Ob.subscribe(observer => {
      console.log("Subscription 2 : ", observer);
    })
  }
  
  ctaClick(event: any) {
    alert('you have clicked');
  }

  //Example #1: Invoking Observable in JavaScript
  simpleObservable() {
    let O = new Observable(subscriber => {
      setTimeout(function(){
        subscriber.next(1);
      }, 2000);
    });
    console.log('Observable invoked');
    O.subscribe();
    console.log("Observable", O);
  }

  //Example #2: Observable JavaScript for Wrapping Array to Observable
  arrayToObservableWrap() {
    const arr = [6, 7, 5, 4, 3, 2, 9];
    return new Observable(subscriber => {
      for(let i =0; i<arr.length; i++) {
        subscriber.next(arr[i]);
      }
    });

  }

}
