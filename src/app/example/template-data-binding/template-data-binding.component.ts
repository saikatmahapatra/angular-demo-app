import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';
@Component({
  selector: 'app-template-data-binding',
  templateUrl: './template-data-binding.component.html',
  styleUrls: ['./template-data-binding.component.css'],
  providers: []
})
export class TemplateDataBindingComponent implements OnInit {
  title = "Template basic";
  fruits = [
    { "name": "Banana", "color": "yellow" },
    { "name": "Mango", "color": "green" },
    { "name": "Apple", "color": "Red" }
  ];
  constructor(private _logger: LoggerService) { }

  ngOnInit() {
    this._logger.log("ngOnInit");
  }

  getVal(){
    return 3;
  }

}
