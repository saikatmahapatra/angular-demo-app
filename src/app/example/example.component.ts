import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  title = 'Angular4';
  subtitle = 'Fundamental of Angular 2';

  constructor() { }

  /**
   * Life cycle hooks
   */
  ngOnInit() {    
    console.log("ngOnInit()");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit()");
  }
  ngOnChanges() {
    console.log("ngOnChanges()");
  }
}
