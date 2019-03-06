import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  IndexComponent,
  PageNotFoundComponent
} from './index';
const routes: Routes = [{
  path: '', component: PageNotFoundComponent,
  children: [
    { path: '404', component: PageNotFoundComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
