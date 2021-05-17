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
  isDisabled: boolean = false;
  userName = 'johnsmith';
  inputVal: any;
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  buttonClick(event: any) {
    this.appService.log(event);
    this.clickMessage = 'You have clicked button value';
  }

  onInputFocus(event) {
    this.appService.log(event);
    this.keyUpInputData = 'Focus Event===>' + event.target.value;
  }

  onInputKeyUp(event) {
    this.appService.log(event);
    this.keyUpInputData = 'Keyup Event===>' + event.target.value;
    this.appService.log(this.keyUpInputData);
  }

  onInputBlur(event) {
    this.appService.log(event);
    this.keyUpInputData = 'Blur Event===>' + event.target.value;
  }

  getValue(event): string {
    this.inputVal =  (event.target as HTMLInputElement).value;
    return this.inputVal;
  }

}
