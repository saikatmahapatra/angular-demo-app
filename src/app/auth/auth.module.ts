import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { SharedModule } from '../@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TwoFactorAuthComponent } from './login-form/two-factor-auth/two-factor-auth.component';

@NgModule({
  declarations: [
    AuthLayoutComponent, LoginFormComponent, ForgotPasswordFormComponent, ResetPasswordFormComponent, TwoFactorAuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
