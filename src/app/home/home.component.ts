import { Component, OnInit } from '@angular/core';
import {ExampleService} from '../example.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ExampleService]
})

export class HomeComponent implements OnInit {
  title = 'Home';
  subtitle = 'welcome';
  constructor(private _exampleService : ExampleService) { }

  ngOnInit() {
    this.getSomeMethod();
  }
  getSomeMethod(){
    this.subtitle = this._exampleService.someMethod();
  }

}
