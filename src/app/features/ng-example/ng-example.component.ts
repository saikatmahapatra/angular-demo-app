import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
@Component({
  selector: 'app-example',
  templateUrl: './ng-example.component.html',
  providers: []
})
export class NgExampleComponent implements OnInit {
  title = 'Angular4';
  subtitle = 'Fundamental of Angular 2';

  constructor(private commonSvc: CommonService) { }

  /**
   * Life cycle hooks
   */
  ngOnInit() {
    console.log("ngOnInit() called");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit() called");
  }
  ngOnChanges() {
    console.log("ngOnChanges() called");
  }
}
