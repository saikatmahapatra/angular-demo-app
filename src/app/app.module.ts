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
import { InterpolationComponent } from './example/interpolation/interpolation.component';
import { CustomdirectiveComponent } from './example/customdirective/customdirective.component';
import { PipesComponent } from './example/pipes/pipes.component';
import { FormInputBindingComponent } from './example/form-input-binding/form-input-binding.component';
import { TemplateDrivenFormComponent } from './example/template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './example/reactive-form/reactive-form.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { AngularServicesComponent } from './example/angular-services/angular-services.component';


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
    InterpolationComponent,
    CustomdirectiveComponent,
    PipesComponent,
    FormInputBindingComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    AboutUsComponent,
    AngularServicesComponent,
          
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
