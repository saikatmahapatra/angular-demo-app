import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const router: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}, {
  path: 'home',
  loadChildren: 'app/home/home.module#HomeModule'
}, {
  path: 'example',
  loadChildren: 'app/example/example.module#ExampleModule'
}, {
  path: 'user',
  loadChildren: 'app/user/user.module#UserModule'
}, {
  path: 'pages',
  loadChildren: 'app/page/page.module#PageModule'
}, {
  path: 'sign_on',
  loadChildren: 'app/sign-on/sign-on.module#SignOnModule'
}, {
  path: 'sign_up',
  loadChildren: 'app/sign-up/sign-up.module#SignUpModule'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(router)
  ],
})
export class AppRoutingModule { }
