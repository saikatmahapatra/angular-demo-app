import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services';

@Component({
  selector: 'app-angular-services',
  templateUrl: './angular-services.component.html',
  providers: [AppService]
})
export class AngularServicesComponent implements OnInit {
  subtitle = 'This is a sub title';
  constructor(private appService: AppService) { }

  testSomeMethod(str){
    this.subtitle = str+' - '+this.appService.someMethod();
  }

  ngOnInit() {
    this.testSomeMethod('Welcome');
  }

}
