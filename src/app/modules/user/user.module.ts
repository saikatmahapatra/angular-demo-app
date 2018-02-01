import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UserComponent }
    ])
  ],
  declarations: [UserComponent]
})
export class UserModule { }
