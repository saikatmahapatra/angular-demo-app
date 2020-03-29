import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/index';
@Component({
  selector: 'app-form-input-binding',
  templateUrl: './form-input-binding.component.html',
  styleUrls: ['./form-input-binding.component.css'],
  providers: []
})
export class FormInputBindingComponent implements OnInit {
  clickMessage = '';
  keyUpInputData = '';
  btnHidden = true;
  buttonCss = 'btn-primary';
  constructor(private _appService: AppService) { }

  ngOnInit() {
  }

  /**
   * Form Interation - Click, Keyup, Keypress etc
   */
  buttonClick(event: any) {
    this._appService.log(event);
    this.clickMessage = 'You have clicked button value';
    //window.alert("Button Clicked");
  }

  keyUpGetInputData(event) {
    this._appService.log(event);
    this.keyUpInputData = event.target.value;
    this._appService.log(this.keyUpInputData);
  }

  clickParentElm(e) {
    this._appService.log(e);
    this._appService.log("Parent Div Clicked");
    window.alert("Parent Div Clicked");
  }

  clickChildElm(e) {
    this._appService.log(e);
    e.stopPropagation(); // to prevent event bubbling
    this._appService.log("Child Div Clicked");
    window.alert("Child Div Clicked");
  }
}
