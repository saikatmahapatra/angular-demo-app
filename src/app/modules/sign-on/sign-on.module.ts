import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignOnComponent } from './sign-on.component';
import { Route, RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SignOnComponent }
    ])
  ],
  declarations: [SignOnComponent],
})
export class SignOnModule { }
