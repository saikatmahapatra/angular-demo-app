import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { router } from './app.router'; // Import routes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { HighlightDirective } from './highlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { MaskPipe } from './mask.pipe';
import { PageComponent } from './page/page.component';
import { ErrorComponent } from './error/error.component';
import { ExampleComponent } from './example/example.component';
import { AngularDirectiveComponent } from './example/angular-directive/angular-directive.component';
import { PipesComponent } from './example/pipes/pipes.component';
import { FormInputBindingComponent } from './example/form-input-binding/form-input-binding.component';
import { TemplateDrivenFormComponent } from './example/template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './example/reactive-form/reactive-form.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { AngularServicesComponent } from './example/angular-services/angular-services.component';
import { TemplateDataBindingComponent } from './example/template-data-binding/template-data-binding.component';
import { OrderByPipe } from './order-by.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,    
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    PageComponent,
    ErrorComponent,
    ExampleComponent,
    PipesComponent,
    FormInputBindingComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    AboutUsComponent,
    AngularServicesComponent,
    TemplateDataBindingComponent,
    OrderByPipe,
    AngularDirectiveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
