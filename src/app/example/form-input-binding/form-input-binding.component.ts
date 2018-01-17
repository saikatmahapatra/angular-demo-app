import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input-binding',
  templateUrl: './form-input-binding.component.html',
  styleUrls: ['./form-input-binding.component.css']
})
export class FormInputBindingComponent implements OnInit {
  clickMessage = '';
  keyUpInputData = '';
  btnHidden = true;
  buttonCss = 'btn-primary';
  constructor() { }

  ngOnInit() {
  }

  /**
   * Form Interation - Click, Keyup, Keypress etc
   */
  buttonClick(e) {
    console.log(e);
    this.clickMessage = 'You have clicked button';
    //window.alert("Button Clicked");
  }

  keyUpGetInputData(event) {
    console.log(event);
    this.keyUpInputData = event.target.value;
    console.log(this.keyUpInputData);
  }

  clickParentElm(e) {
    console.log(e);
    console.log("Parent Div Clicked");
    window.alert("Parent Div Clicked");
  }

  clickChildElm(e) {
    console.log(e);
    e.stopPropagation(); // to prevent event bubbling
    console.log("Child Div Clicked");
    window.alert("Child Div Clicked");
  }
}
