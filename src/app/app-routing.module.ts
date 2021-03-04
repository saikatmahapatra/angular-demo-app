import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Routing with lazy loading
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: 'src/app/home/home.module#HomeModule' },
  { path: 'pages', loadChildren: 'src/app/page/page.module#PageModule' },
  { path: 'angular-example', loadChildren: 'src/app/ng-example/ng-example.module#NgExampleModule' },
  { path: 'user', loadChildren: 'src/app/user/user.module#UserModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
