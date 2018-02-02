import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
export const router: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },    
    //{ path: '**', component: PageNotFoundComponent},
    { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule' },
    { path: 'example', loadChildren: 'app/modules/example/example.module#ExampleModule' },
    { path: 'user', loadChildren: 'app/modules/user/user.module#UserModule' },
    { path: 'pages', loadChildren: 'app/modules/page/page.module#PageModule' },
    { path: 'sign_on', loadChildren: 'app/modules/sign-on/sign-on.module#SignOnModule' },
    { path: 'sign_up', loadChildren: 'app/modules/sign-up/sign-up.module#SignUpModule' },
];
