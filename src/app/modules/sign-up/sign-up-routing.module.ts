import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up.component';

const router: Routes = [{
  path: '',
  component: SignUpComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
})
export class SignUpRoutingModule { }
