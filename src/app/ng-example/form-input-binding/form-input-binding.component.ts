import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
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
  isDisabled = false;
  userName = 'johnsmith';
  inputVal: any;
  myClassExpression: any = 'text-danger mx-3 text-underline';
  isDanger = true;
  productQty = 2;
  constructor(private commonSvc: CommonService) { }

  ngOnInit() {
  }

  buttonClick(event: any) {
    console.log(event);
    this.clickMessage = 'You have clicked button value';
  }

  onInputFocus(event) {
    console.log(event);
    this.keyUpInputData = 'Focus Event===>' + event.target.value;
  }

  onInputKeyUp(event) {
    console.log(event);
    this.keyUpInputData = 'Keyup Event===>' + event.target.value;
    console.log(this.keyUpInputData);
  }

  onInputBlur(event) {
    console.log(event);
    this.keyUpInputData = 'Blur Event===>' + event.target.value;
  }

  getValue(event): string {
    this.inputVal =  (event.target as HTMLInputElement).value;
    return this.inputVal;
  }

}
