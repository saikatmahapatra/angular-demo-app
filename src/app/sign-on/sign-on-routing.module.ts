import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignOnComponent } from './sign-on.component';

const router: Routes = [{
  path: '',
  component: SignOnComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
})
export class SignOnRoutingModule { }
