import { Component, OnInit } from '@angular/core';
import { CommonService } from '../@core/services/common.service';
@Component({
  selector: 'app-example',
  templateUrl: './ng-example.component.html',
  providers: []
})
export class NgExampleComponent implements OnInit {
  title = 'Angular4';
  subtitle = 'Fundamental of Angular 2';

  menuLinks = [
    { link: '/', text: 'App Home' },
    { link: '/example/test', text: 'Test' },
    { link: '/example/template-basic', text: 'Template Basic' },
    { link: '/example/types-of-angular-directive', text: 'Directive' },
    { link: '/example/pipes', text: 'Pipes' },
    { link: '/example/user-input-binding', text: 'Data Binding' },
    { link: '/example/template-driven-form', text: 'Template Driven Form' },
    { link: '/example/reactive-form', text: 'Reactive Form' },
    { link: '/example/angular-services', text: 'Use of Service' },
    { link: '/example/parent-comp', text: 'Parent-Child Component' },
    { link: '/example/employee', text: 'Observable (RxJS Operators)' },
    { link: '/example/tranfer-fund', text: 'Routing Basic' },
    { link: '/example/content-projection', text: 'Content Projection' },
    { link: '/example/ag-grid', text: 'AG Grid Demo' },
    { link: '/example/translate', text: 'i18n Translation' },
    { link: '/example/prime-ng', text: 'PrimeNG Theme'}
  ];

  constructor(private commonSvc: CommonService) { }

  /**
   * Life cycle hooks
   */
  ngOnInit() {
    console.log("ngOnInit() called");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit() called");
  }
  ngOnChanges() {
    console.log("ngOnChanges() called");
  }
}
