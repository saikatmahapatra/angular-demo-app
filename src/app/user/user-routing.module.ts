import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: ManageUsersComponent },
      { path: 'add', component: AddUserComponent },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class UserRoutingModule { }
