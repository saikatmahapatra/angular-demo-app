import { Component, OnInit } from '@angular/core';
import {ExampleService} from '../example.service';

/**
 * Import the user class for form example
 */
import {User} from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ExampleService]
})

export class HomeComponent implements OnInit {
  title = '';
  subtitle = 'welcome';
  clickMessage = '';
  keyUpInputData = '';
  btnHidden = true;
  buttonCss = 'btn-default';
  birthday = new Date(1988, 3, 15); 
  fruits = [{"name":"Banana","color":"yellow"},{"name":"Mango","color":"green"},{"name":"Apple","color":"Red"}];
  constructor(private _exampleService : ExampleService) { }

  
  getSomeMethod(){
    this.subtitle = this._exampleService.someMethod();
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

  /**
   * Form Interation - Click, Keyup, Keypress etc
   */
  buttonClick(e){
    console.log(e);
    this.clickMessage = 'You have clicked button';
    //window.alert("Button Clicked");
  }

  keyUpGetInputData(event){
    console.log(event);
    this.keyUpInputData = event.target.value;
    console.log(this.keyUpInputData);
  }

  txtBlur(event){
    console.log("Blur");
    console.log(event.target.value);
  }

  clickParentElm(e){
    console.log(e);
  }

  clickChildElm(e){
    console.log(e);
    e.preventDefault(); 
  }
  
  /**
   * Template Driven Form
   */
  phoneTypes = [
    {"val":"-1","txt":"-Select-"},
  {"val":"m","txt":"Mobile"},
  {"val":"w","txt":"Work"},
  {"val":"h","txt":"Home"},
];
  isSubmitted = false;
  model = new User(1,'Saikat','Mahapatra','mahapatra.saikat@gmail.com','','');
  onSubmit(event){
    console.log(event);
    this.isSubmitted = true;
  }
  get diagonostic(){
    return JSON.stringify(this.model);
  }


}
