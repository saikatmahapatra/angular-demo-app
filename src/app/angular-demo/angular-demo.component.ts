import { Component, OnInit } from '@angular/core';
import { CommonService } from '../@core/services/common.service';
@Component({
  selector: 'app-demo',
  templateUrl: './angular-demo.component.html',
  providers: []
})
export class AngularDemoComponent implements OnInit {
  title = 'Angular4';
  subtitle = 'Fundamental of Angular 2';

  menuLinks = [    
    { link: '/demo/test', text: 'Test Component' },
    { link: '/demo/template-basic', text: 'Template Basic (Data, Event Binding etc)' },
    { link: '/demo/types-of-angular-directive', text: 'Directive' },
    { link: '/demo/pipes', text: 'Pipes' },
    { link: '/demo/user-input-binding', text: 'Data Binding' },
    { link: '/demo/template-driven-form', text: 'Template Driven Form' },
    { link: '/demo/reactive-form', text: 'Reactive Form' },
    { link: '/demo/angular-services', text: 'Use of Service' },
    { link: '/demo/parent-comp', text: 'Parent-Child Component' },
    { link: '/demo/employee', text: 'Observable (RxJS Operators)' },
    { link: '/demo/tranfer-fund', text: 'Routing Basic' },
    { link: '/demo/content-projection', text: 'Content Projection' },
    { link: '/demo/ag-grid', text: 'AG Grid Demo' },
    { link: '/demo/translate', text: 'i18n Translation' },
    { link: '/demo/kore-ai', text: 'Kore.ai poc'},
    { link: '/demo/prime-ng', text: 'PrimeNG Theme'}
  ];

  constructor(private commonSvc: CommonService) { 
    this.commonSvc.setTitle('Angular Concepts Example');
  }

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
