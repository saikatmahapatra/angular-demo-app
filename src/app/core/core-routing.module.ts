import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'bootstrap',
    loadChildren: 'app/bootstrap/twitterbootstrap.module#TwitterbootstrapModule'
  },
  {
    path: 'error',
    loadChildren: 'app/error/error.module#ErrorModule'
  },
  {
    path: 'angular-example',
    loadChildren: 'app/ng-example/ng-example.module#NgExampleModule'
  },
  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: 'pages',
    loadChildren: 'app/page/page.module#PageModule'
  },
  {
    path: 'sign_on',
    loadChildren: 'app/sign-on/sign-on.module#SignOnModule'
  },
  {
    path: 'test_module',
    loadChildren: 'app/test/test.module#TestModule'
  },
  {
    path: 'kore',
    loadChildren: 'app/kore-ai/kore-ai.module#KoreAiModule'
  },
  {
    path: 'payment',
    loadChildren: 'app/payment/payment.module#PaymentModule'
  },
  {
    path: 'quick',
    loadChildren: 'app/quick/quick.module#QuickModule'
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
