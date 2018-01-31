import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component'
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserComponent],
  bootstrap:[UserComponent]
})
export class UserModule { }
