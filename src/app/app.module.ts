import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Import routes
import { router } from './app.router';

//Import components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { HighlightDirective } from './highlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { MaskPipe } from './mask.pipe';
import { PageComponent } from './page/page.component';
import { ErrorComponent } from './error/error.component';
import { ExampleComponent } from './example/example.component';
import { CustomdirectiveComponent } from './example/customdirective/customdirective.component';
import { PipesComponent } from './example/pipes/pipes.component';
import { FormInputBindingComponent } from './example/form-input-binding/form-input-binding.component';
import { TemplateDrivenFormComponent } from './example/template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './example/reactive-form/reactive-form.component';
<<<<<<< HEAD
import { AboutUsComponent } from './page/about-us/about-us.component';
import { AngularServicesComponent } from './example/angular-services/angular-services.component';
=======
import { TemplateDataBindingComponent } from './example/template-data-binding/template-data-binding.component';
import { OrderByPipe } from './order-by.pipe';
>>>>>>> c19e969a8f6f33dd0a562d0bd0485ddd429f0b6c


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
    CustomdirectiveComponent,
    PipesComponent,
    FormInputBindingComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
<<<<<<< HEAD
    AboutUsComponent,
    AngularServicesComponent,
=======
    TemplateDataBindingComponent,
    OrderByPipe,
>>>>>>> c19e969a8f6f33dd0a562d0bd0485ddd429f0b6c
          
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
