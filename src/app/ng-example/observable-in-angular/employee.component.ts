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

  }
  
  ctaClick(event: any) {
    alert('you have clicked');
  }

}
