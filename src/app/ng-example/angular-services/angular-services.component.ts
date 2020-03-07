import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/index';

@Component({
  selector: 'app-angular-services',
  templateUrl: './angular-services.component.html',
  styleUrls: ['./angular-services.component.css'],
  providers: [AppService]
})
export class AngularServicesComponent implements OnInit {
  subtitle = 'This is a sub title';
  constructor(private _appService: AppService) { }

  testSomeMethod(str){
    this.subtitle = str+' - '+this._appService.someMethod();
  }

  ngOnInit() {
    this.testSomeMethod('Welcome');
  }

}
