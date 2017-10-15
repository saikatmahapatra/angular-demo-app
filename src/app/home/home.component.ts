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
  btnHidden = true;
  buttonCss = 'btn-default';
  birthday = new Date(1988, 3, 15); 
  fruits = [{"name":"Banana","color":"yellow"},{"name":"Mango","color":"green"},{"name":"Apple","color":"Red"}];
  constructor(private _exampleService : ExampleService) { }

  
  getSomeMethod(){
    this.subtitle = this._exampleService.someMethod();
  }

  buttonClick(e){
    console.log(e);
    window.alert("Button Clicked");
  }
  /**
   * Life cycle hooks
   */
  ngOnInit() {
    this.getSomeMethod();
    console.log("ngOnInit()");
  }
  ngAfterViewInit(){
    console.log("ngAfterViewInit()");
  }
  ngOnChanges(){
    console.log("ngOnChanges()");
  }

}
