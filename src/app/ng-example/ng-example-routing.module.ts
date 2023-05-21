import { NgModule } from '@angular/core';
// import ActivateRoute, ParamMap for query string related things
import { Routes, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';

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
import { ContentCardComponent } from './content-card/content-card.component';
import { AgGridTableExampleComponent } from './ag-grid-table-example/ag-grid-table-example.component';
import { TranslationDemoComponent } from './translation-demo/translation-demo.component';
import { PrimeNgUiKitComponent } from './prime-ng-ui-kit/prime-ng-ui-kit.component';

const routes: Routes = [{
  path: '',
  component: NgExampleComponent,
  children: [
    { path: '', component: TemplateDataBindingComponent },
    { path: 'test', component: TestComponent },
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
    { path: 'employee', component: EmployeeComponent },
    { path: 'tranfer-fund', component: TransferFundComponent },
    { path: 'content-projection', component: ContentCardComponent },
    { path: 'ag-grid', component: AgGridTableExampleComponent },
    { path: 'translate', component: TranslationDemoComponent},
    { path: 'prime-ng', component: PrimeNgUiKitComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class NgExampleRoutingModule { }
