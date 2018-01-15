import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpolation',
  templateUrl: './interpolation.component.html',
  styleUrls: ['./interpolation.component.css']
})
export class InterpolationComponent implements OnInit {
  title = "Interpolation";
  fruits = [{ "name": "Banana", "color": "yellow" }, { "name": "Mango", "color": "green" }, { "name": "Apple", "color": "Red" }];
  constructor() { }

  ngOnInit() {
  }

}
