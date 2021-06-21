import { Component, OnInit } from '@angular/core';
import { NgExampleService } from '../ng-example.service';

@Component({
  selector: 'app-angular-services',
  templateUrl: './angular-services.component.html',
  providers: [NgExampleService]
})
export class AngularServicesComponent implements OnInit {
  subtitle = 'This is AngularServicesComponent. ';
  constructor(private mySvc: NgExampleService) { }

  ngOnInit() {
    this.subtitle += this.mySvc.test();
  }

}
