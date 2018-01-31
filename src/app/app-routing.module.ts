import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home' },
  { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'error', loadChildren: './modules/error/error.module#ErrorModule' },
  { path: 'example', loadChildren: './modules/example/example.module#ExampleModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
