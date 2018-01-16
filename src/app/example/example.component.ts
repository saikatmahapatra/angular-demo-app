import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  providers: [ExampleService]
})
export class ExampleComponent implements OnInit {
  title = 'Angular4';
  subtitle = 'Fundamental of Angular 2';

  constructor(private _exampleService: ExampleService) { }

  getSomeMethod() {
    this.subtitle = this._exampleService.someMethod();
  }


  /**
   * Life cycle hooks
   */
  ngOnInit() {
    this.getSomeMethod();
    console.log("ngOnInit()");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit()");
  }
  ngOnChanges() {
    console.log("ngOnChanges()");
  }
}
