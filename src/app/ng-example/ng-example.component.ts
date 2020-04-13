import { Component, OnInit } from '@angular/core';
import { AppService } from '../services';
@Component({
  selector: 'app-example',
  templateUrl: './ng-example.component.html',
  providers: []
})
export class NgExampleComponent implements OnInit {
  title = 'Angular4';
  subtitle = 'Fundamental of Angular 2';

  constructor(private appService: AppService) { }

  /**
   * Life cycle hooks
   */
  ngOnInit() {
    this.appService.log("ngOnInit() called");
  }
  ngAfterViewInit() {
    this.appService.log("ngAfterViewInit() called");
  }
  ngOnChanges() {
    this.appService.log("ngOnChanges() called");
  }
}
