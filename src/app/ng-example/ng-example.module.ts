import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NgExampleRoutingModule } from './ng-example-routing.module';

import {
  NgExampleLayoutComponent,
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



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    NgExampleRoutingModule
  ],
  declarations: [
    NgExampleLayoutComponent,
    NgExampleComponent,
    AngularDirectiveComponent,
    PipesComponent,
    FormInputBindingComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    AngularServicesComponent,
    TemplateDataBindingComponent,
    TestComponent,
    ChildComponent,
    ParentComponent,
    EmployeeComponent
  ],
  exports: []
})
export class NgExampleModule { }
