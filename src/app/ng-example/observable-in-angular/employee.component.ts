import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
