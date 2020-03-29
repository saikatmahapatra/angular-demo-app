import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/index';
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
  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._appService.log("ngOnInit");
  }

  getVal(){
    return 3;
  }

}
