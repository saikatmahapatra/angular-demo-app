import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DynamicFormModule } from '../../shared/modules/dynamic-form/dynamic-form.module';
import { SignOnComponent } from './sign-on.component';
import { SignOnRoutingModule } from './sign-on-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    SignOnRoutingModule,
    DynamicFormModule
  ],
  declarations: [SignOnComponent],
})
export class SignOnModule { }
