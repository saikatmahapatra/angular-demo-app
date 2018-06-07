import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-angular-services',
  templateUrl: './angular-services.component.html',
  styleUrls: ['./angular-services.component.css'],
  providers: [CommonService]
})
export class AngularServicesComponent implements OnInit {
  subtitle = 'This is a sub title';
  constructor(private _commSv: CommonService) { }

  testSomeMethod(str){
    this.subtitle = str+' - '+this._commSv.someMethod();
  }

  ngOnInit() {
    this.testSomeMethod('Welcome');
  }

}
