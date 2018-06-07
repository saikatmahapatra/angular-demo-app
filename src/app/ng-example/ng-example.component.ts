import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../shared/services/logger.service';
@Component({
  selector: 'app-example',
  templateUrl: './ng-example.component.html',
  styleUrls: ['./ng-example.component.css'],
  providers: []
})
export class NgExampleComponent implements OnInit {
  title = 'Angular4';
  subtitle = 'Fundamental of Angular 2';

  constructor(private _logger: LoggerService) { }

  /**
   * Life cycle hooks
   */
  ngOnInit() {    
    this._logger.log("ngOnInit() called");
  }
  ngAfterViewInit() {
    this._logger.log("ngAfterViewInit() called");
  }
  ngOnChanges() {
    this._logger.log("ngOnChanges() called");
  }
}
