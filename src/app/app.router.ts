import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExampleComponent } from './example/example.component';
import { UserComponent } from './user/user.component';
import { PageComponent } from './page/page.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { ErrorComponent } from './error/error.component';
<<<<<<< HEAD
import { InterpolationComponent } from './example/interpolation/interpolation.component';
=======
import { ServicesComponent } from './page/services/services.component';

>>>>>>> c19e969a8f6f33dd0a562d0bd0485ddd429f0b6c
import { CustomdirectiveComponent } from './example/customdirective/customdirective.component';
import { PipesComponent } from './example/pipes/pipes.component';
import { FormInputBindingComponent } from './example/form-input-binding/form-input-binding.component';
import { TemplateDrivenFormComponent } from './example/template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './example/reactive-form/reactive-form.component';
<<<<<<< HEAD
import { AngularServicesComponent } from './example/angular-services/angular-services.component';
=======
import { TemplateDataBindingComponent } from './example/template-data-binding/template-data-binding.component';

>>>>>>> c19e969a8f6f33dd0a562d0bd0485ddd429f0b6c
// tslint:disable-next-line:typedef-whitespace
export const router: Routes = [
    { path: '', redirectTo: 'example', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent }, 
    
    { path: 'example', component: ExampleComponent, children: [
        {path:'template-basic', component: TemplateDataBindingComponent},
        {path:'customdirective', component: CustomdirectiveComponent},
        {path:'pipes', component: PipesComponent},
        {path:'user-input-binding', component: FormInputBindingComponent},
        {path:'template-driven-form', component: TemplateDrivenFormComponent},
        {path:'reactive-form', component: ReactiveFormComponent},
        {path:'angular-services', component: AngularServicesComponent},
    ]} ,
    { path: 'pages', component: PageComponent, children: [{ path: 'about-us', component:AboutUsComponent }]},  
    { path: '**', component: ErrorComponent }
];
