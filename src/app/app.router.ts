import {ModuleWithProviders} from '@angular/core';
import {Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

// tslint:disable-next-line:typedef-whitespace
export const router : Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'user', component: UserComponent}    
];
