import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  UserComponent
} from './index';

const routes: Routes = [{
  path: '',
  component: UserComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class UserRoutingModule { }
