import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '../home/home.module#HomeModule'
  },
  {
    path: 'pages',
    loadChildren: '../page/page.module#PageModule'
  },
  {
    path: 'angular-example',
    loadChildren: '../ng-example/ng-example.module#NgExampleModule'
  },
  {
    path: 'user',
    loadChildren: '../user/user.module#UserModule'
  },
  {
    path: 'payment',
    loadChildren: '../payment/payment.module#PaymentModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
