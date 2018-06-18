import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DynamicFormModule } from '../shared/modules/dynamic-form/dynamic-form.module';
import { NgExampleComponent } from './ng-example.component';

import { TemplateDataBindingComponent } from './template-data-binding/template-data-binding.component';
import { AngularDirectiveComponent } from './angular-directive/angular-directive.component';
import { PipesComponent } from './pipes/pipes.component';
import { FormInputBindingComponent } from './form-input-binding/form-input-binding.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AngularServicesComponent } from './angular-services/angular-services.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { NgExampleRoutingModule } from './ng-example-routing.module';
import { WebChatComponent } from './web-chat/web-chat.component';
import { TestComponent } from './test/test.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicFormModule,
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
    ApplyJobComponent,
    WebChatComponent,
    TestComponent,
    ChildComponent,
    ParentComponent
  ],
  exports:[
    WebChatComponent
  ]
})
export class NgExampleModule { }