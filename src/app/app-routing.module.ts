import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routing with lazy loading
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/error', pathMatch: 'full' },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'bootstrap', loadChildren: 'app/bootstrap/twitterbootstrap.module#TwitterbootstrapModule' },
  { path: 'error', loadChildren: 'app/error/error.module#ErrorModule' },
  { path: 'angular-example', loadChildren: 'app/ng-example/ng-example.module#NgExampleModule' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'pages', loadChildren: 'app/page/page.module#PageModule' },
  { path: 'sign_on', loadChildren: 'app/sign-on/sign-on.module#SignOnModule' },
  { path: 'test_module', loadChildren: 'app/test/test.module#TestModule' },
  { path: 'kore', loadChildren: 'app/kore-ai/kore-ai.module#KoreAiModule' },
  { path: 'payment', loadChildren: 'app/payment/payment.module#PaymentModule' },
  { path: 'quick', loadChildren: 'app/quick/quick.module#QuickModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
