import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services';
@Component({
  selector: 'app-form-input-binding',
  templateUrl: './form-input-binding.component.html',
  providers: []
})
export class FormInputBindingComponent implements OnInit {
  clickMessage = '';
  keyUpInputData = '';
  btnHidden = true;
  buttonCss = 'btn-primary';
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  /**
   * Form Interation - Click, Keyup, Keypress etc
   */
  buttonClick(event: any) {
    this.appService.log(event);
    this.clickMessage = 'You have clicked button value';
    //window.alert("Button Clicked");
  }

  keyUpGetInputData(event) {
    this.appService.log(event);
    this.keyUpInputData = event.target.value;
    this.appService.log(this.keyUpInputData);
  }

  clickParentElm(e) {
    this.appService.log(e);
    this.appService.log("Parent Div Clicked");
    window.alert("Parent Div Clicked");
  }

  clickChildElm(e) {
    this.appService.log(e);
    e.stopPropagation(); // to prevent event bubbling
    this.appService.log("Child Div Clicked");
    window.alert("Child Div Clicked");
  }
}
