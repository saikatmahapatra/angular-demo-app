import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const router: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
})
export class HomeRoutingModule { }
