import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { UserComponent } from './user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MyAccountComponent } from './my-account/my-account.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    UserRoutingModule
  ],
  declarations: [
    ManageUsersComponent,
    MyAccountComponent,
    UserComponent
  ]
})
export class UserModule { }
