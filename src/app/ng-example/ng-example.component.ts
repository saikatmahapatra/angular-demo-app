import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services';
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
    this.commonSvc.log("ngOnInit() called");
  }
  ngAfterViewInit() {
    this.commonSvc.log("ngAfterViewInit() called");
  }
  ngOnChanges() {
    this.commonSvc.log("ngOnChanges() called");
  }
}
