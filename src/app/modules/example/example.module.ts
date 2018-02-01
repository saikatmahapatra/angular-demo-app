import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example.component';
import { AngularDirectiveComponent } from './angular-directive/angular-directive.component';
import { PipesComponent } from './pipes/pipes.component';
import { FormInputBindingComponent } from './form-input-binding/form-input-binding.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { TemplateDataBindingComponent } from './template-data-binding/template-data-binding.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AngularServicesComponent } from './angular-services/angular-services.component';

// import { ExponentialStrengthPipe } from '../../shared/pipes/exponential-strength.pipe';
// import { MaskPipe } from '../../shared/pipes/mask.pipe';
// import { OrderByPipe } from '../../shared/pipes/order-by.pipe';
// import { HighlightDirective } from '../../shared/directives/highlight.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ExampleComponent,
        children: [
          { path: 'template-basic', component: TemplateDataBindingComponent },
          { path: 'types-of-angular-directive', component: AngularDirectiveComponent },
          { path: 'pipes', component: PipesComponent },
          { path: 'user-input-binding', component: FormInputBindingComponent },
          { path: 'template-driven-form', component: TemplateDrivenFormComponent },
          { path: 'reactive-form', component: ReactiveFormComponent },
          { path: 'angular-services', component: AngularServicesComponent },
          { path: '', component: ExampleComponent }
        ]
      }
    ])

  ],
  declarations: [
    ExampleComponent,
    AngularDirectiveComponent,
    PipesComponent,
    FormInputBindingComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    AngularServicesComponent,
    TemplateDataBindingComponent,
    // ExponentialStrengthPipe,
    // MaskPipe,
    // OrderByPipe,
    // HighlightDirective
  ]
})
export class ExampleModule { }
