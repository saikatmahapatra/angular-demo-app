import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-data-binding',
  templateUrl: './template-data-binding.component.html',
  styleUrls: ['./template-data-binding.component.css']
})
export class TemplateDataBindingComponent implements OnInit {
  title = "Template basic";
  fruits = [
    { "name": "Banana", "color": "yellow" },
    { "name": "Mango", "color": "green" },
    { "name": "Apple", "color": "Red" }
  ];
  constructor() { }

  ngOnInit() {
    console.log("ngOnInit");
  }

}
