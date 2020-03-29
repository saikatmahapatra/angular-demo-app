import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/index';
@Component({
  selector: 'app-example',
  templateUrl: './ng-example.component.html',
  styleUrls: ['./ng-example.component.scss'],
  providers: []
})
export class NgExampleComponent implements OnInit {
  title = 'Angular4';
  subtitle = 'Fundamental of Angular 2';

  constructor(private _appService: AppService) { }

  /**
   * Life cycle hooks
   */
  ngOnInit() {
    this._appService.log("ngOnInit() called");
  }
  ngAfterViewInit() {
    this._appService.log("ngAfterViewInit() called");
  }
  ngOnChanges() {
    this._appService.log("ngOnChanges() called");
  }
}
