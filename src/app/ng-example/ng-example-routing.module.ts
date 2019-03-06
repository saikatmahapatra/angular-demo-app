import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {
  NgExampleComponent,
  TemplateDataBindingComponent,
  AngularDirectiveComponent,
  PipesComponent,
  FormInputBindingComponent,
  TemplateDrivenFormComponent,
  ReactiveFormComponent,
  AngularServicesComponent,
  TestComponent,
  ChildComponent,
  ParentComponent,
  EmployeeComponent
} from './index';

const routes: Routes = [{
  path: '',
  component: NgExampleComponent,
  children: [
    { path: 'template-basic', component: TemplateDataBindingComponent },
    { path: 'types-of-angular-directive', component: AngularDirectiveComponent },
    { path: 'pipes', component: PipesComponent },
    { path: 'user-input-binding', component: FormInputBindingComponent },
    { path: 'template-driven-form', component: TemplateDrivenFormComponent },
    { path: 'reactive-form', component: ReactiveFormComponent },
    { path: 'angular-services', component: AngularServicesComponent },
    { path: 'test', component: TestComponent },
    { path: 'child-comp', component: ChildComponent },
    { path: 'parent-comp', component: ParentComponent },
    { path: 'observable-in-angular', component: EmployeeComponent },
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class NgExampleRoutingModule { }
