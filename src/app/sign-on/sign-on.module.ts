import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SignOnComponent } from './sign-on.component';
import { SignOnRoutingModule } from './sign-on-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SignOnRoutingModule,
  ],
  declarations: [SignOnComponent],
})
export class SignOnModule { }
