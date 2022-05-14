import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: ManageUsersComponent },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class UserRoutingModule { }
