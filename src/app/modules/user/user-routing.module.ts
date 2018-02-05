import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const router: Routes = [{
  path: '',
  component: UserComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
})
export class UserRoutingModule { }
