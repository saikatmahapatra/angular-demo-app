import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  showShubhead = true;
  constructor() { }

  ngOnInit() {
    this.simpleObservable();
  }
  
  ctaClick(event: any) {
    alert('you have clicked');
  }

  simpleObservable() {
    let O = new Observable(observer => {
      setTimeout(function(){
        observer.next(1);
      }, 2000);
    });
    console.log('Observable invoked');
    O.subscribe();
    console.log("Observable", O);
  }

  subscribe() {
    console.log('subscribe btn clicked');
  }

  unsubscribe() {
    console.log('unsubscribe btn clicked');
  }

}
