import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routing with lazy loading
const router: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'angular-example', loadChildren: 'app/ng-example/ng-example.module#NgExampleModule' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'pages', loadChildren: 'app/page/page.module#PageModule' },
  { path: 'sign_on', loadChildren: 'app/sign-on/sign-on.module#SignOnModule' },
  { path: 'sign_up', loadChildren: 'app/sign-up/sign-up.module#SignUpModule' },
  { path: 'test_module', loadChildren: 'app/test/test.module#TestModule' },
  { path: 'kore', loadChildren: 'app/kore-ai/kore-ai.module#KoreAiModule' },
  { path: 'bootstrap', loadChildren: 'app/bootstrap-ui/bootstrap-ui.module#BootstrapUiModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(router)
  ],
})
export class AppRoutingModule { }
