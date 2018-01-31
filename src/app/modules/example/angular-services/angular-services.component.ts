import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../../../shared/services/example.service';

@Component({
  selector: 'app-angular-services',
  templateUrl: './angular-services.component.html',
  styleUrls: ['./angular-services.component.css'],
  providers: [ExampleService]
})
export class AngularServicesComponent implements OnInit {
  subtitle = 'This is a sub title';
  constructor(private _exampleService: ExampleService) { }

  testSomeMethod(str){
    this.subtitle = str+' - '+this._exampleService.someMethod();
  }

  ngOnInit() {
    this.testSomeMethod('Welcome');
  }

}
