import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

export const router: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
    { path: '**', loadChildren: './modules/error/error.module#ErrorModule' },
    { path: 'example', loadChildren: './modules/example/example.module#ExampleModule' }
    
];
