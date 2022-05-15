import { Component, OnInit } from '@angular/core';
import { NgExampleService } from '../ng-example.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-angular-services',
  templateUrl: './angular-services.component.html',
  providers: [NgExampleService]
})
export class AngularServicesComponent implements OnInit {
  subtitle = 'This is AngularServicesComponent. ';
  constructor(private mySvc: NgExampleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subtitle += this.mySvc.test();
  }

  goToTest() {
    this.router.navigate(['/angular-example/test/'], {queryParams: {cutomField1: 1234, cutomField2: 'abc', cutomField3: 'xyz'}});
  }

}
