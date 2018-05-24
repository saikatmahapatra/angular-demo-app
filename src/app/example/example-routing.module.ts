import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from './example.component';
import { TemplateDataBindingComponent } from './template-data-binding/template-data-binding.component';
import { AngularDirectiveComponent } from './angular-directive/angular-directive.component';
import { PipesComponent } from './pipes/pipes.component';
import { FormInputBindingComponent } from './form-input-binding/form-input-binding.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AngularServicesComponent } from './angular-services/angular-services.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { WebChatComponent } from './web-chat/web-chat.component';
const router: Routes = [{
  path: '',
  component: ExampleComponent,
  children: [{
    path: 'template-basic',
    component: TemplateDataBindingComponent
  }, {
    path: 'types-of-angular-directive',
    component: AngularDirectiveComponent
  }, {
    path: 'pipes',
    component: PipesComponent
  }, {
    path: 'user-input-binding',
    component: FormInputBindingComponent
  }, {
    path: 'template-driven-form',
    component: TemplateDrivenFormComponent
  }, {
    path: 'reactive-form',
    component: ReactiveFormComponent
  }, {
    path: 'dynamic-form',
    component: ApplyJobComponent
  }, {
    path: 'angular-services',
    component: AngularServicesComponent
  }, {
    path: 'web-chat',
    component: WebChatComponent
  }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
})
export class ExampleRoutingModule { }
