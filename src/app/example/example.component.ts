import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ExampleService } from '../example.service';
>>>>>>> c19e969a8f6f33dd0a562d0bd0485ddd429f0b6c

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
