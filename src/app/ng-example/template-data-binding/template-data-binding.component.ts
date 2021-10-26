import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-template-data-binding',
  templateUrl: './template-data-binding.component.html',
  providers: []
})
export class TemplateDataBindingComponent implements OnInit {
  title = "Template basic";
  fruits = [
    { "name": "Banana", "color": "yellow" },
    { "name": "Mango", "color": "green" },
    { "name": "Apple", "color": "Red" }
  ];
  constructor(private commonSvc: CommonService) { }

  ngOnInit() {
    this.commonSvc.log("ngOnInit");
  }

  getVal(){
    return 3;
  }

  getSomeFnSvc() {
    this.commonSvc.testFn();
  }

}
