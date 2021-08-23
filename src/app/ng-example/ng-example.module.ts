import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgExampleRoutingModule } from './ng-example-routing.module';
import { NgExampleComponent } from './ng-example.component';
import { TemplateDataBindingComponent } from './template-data-binding/template-data-binding.component';
import { AngularDirectiveComponent } from './angular-directive/angular-directive.component';
import { PipesComponent } from './pipes/pipes.component';
import { FormInputBindingComponent } from './form-input-binding/form-input-binding.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AngularServicesComponent } from './angular-services/angular-services.component';
import { TestComponent } from './test/test.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { EmployeeComponent } from './observable-in-angular/employee.component';
import { TransferFundComponent } from './transfer-fund/transfer-fund.component';
import { AddToCartComponent } from './form-input-binding/add-to-cart/add-to-cart.component';


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
    EmployeeComponent,
    TransferFundComponent,
    AddToCartComponent
  ],
  exports: []
})
export class NgExampleModule { }
