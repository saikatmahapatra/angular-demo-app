import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { DefaultLayoutComponent } from './core/layouts/default-layout/default-layout.component';
import { UnauthenticatedLayoutComponent } from './core/layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './core/layouts/authenticated-layout/authenticated-layout.component';

// Routing with lazy loading
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'pages', loadChildren: () => import('./features/page/page.module').then(m => m.PageModule) },
  { path: 'angular-example', loadChildren: () => import('./features/ng-example/ng-example.module').then(m => m.NgExampleModule) },
  { path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: '**', component: PageNotFoundComponent } // wildcard will be at always last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }