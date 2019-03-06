import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SignOnFormComponent
} from './index';

const routes: Routes = [{
  path: '',
  component: SignOnFormComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class SignOnRoutingModule { }
