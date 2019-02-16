import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../shared/common-services/index';
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
  constructor(private _logger: LoggerService) { }

  ngOnInit() {
  }

  /**
   * Form Interation - Click, Keyup, Keypress etc
   */
  buttonClick(event: any) {
    this._logger.log(event);
    this.clickMessage = 'You have clicked button value';
    //window.alert("Button Clicked");
  }

  keyUpGetInputData(event) {
    this._logger.log(event);
    this.keyUpInputData = event.target.value;
    this._logger.log(this.keyUpInputData);
  }

  clickParentElm(e) {
    this._logger.log(e);
    this._logger.log("Parent Div Clicked");
    window.alert("Parent Div Clicked");
  }

  clickChildElm(e) {
    this._logger.log(e);
    e.stopPropagation(); // to prevent event bubbling
    this._logger.log("Child Div Clicked");
    window.alert("Child Div Clicked");
  }
}
