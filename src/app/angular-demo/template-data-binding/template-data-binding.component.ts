import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../@core/services/common.service';
@Component({
    selector: 'app-template-data-binding',
    templateUrl: './template-data-binding.component.html',
    providers: [],
    standalone: false
})
export class TemplateDataBindingComponent implements OnInit {
  title = "Data Binding in Template";
  fruits = [
    { "name": "Banana", "color": "yellow" },
    { "name": "Mango", "color": "green" },
    { "name": "Apple", "color": "Red" }
  ];
  constructor(private commonSvc: CommonService) { }

  ngOnInit() {
    console.log("ngOnInit");
  }

  getVal(){
    return 3;
  }

}
