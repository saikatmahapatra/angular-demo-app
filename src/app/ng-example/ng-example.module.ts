import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../@shared/shared.module';
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
import { SumDigitPipePipe } from './pipes/custom-pipes/sum-digit-pipe.pipe';
import { ContentCardComponent } from './content-card/content-card.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridTableExampleComponent } from './ag-grid-table-example/ag-grid-table-example.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    NgExampleRoutingModule,
    AgGridModule
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
    AddToCartComponent,
    SumDigitPipePipe,
    ContentCardComponent,
    AgGridTableExampleComponent,
  ],
  exports: [
    SumDigitPipePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgExampleModule { }
