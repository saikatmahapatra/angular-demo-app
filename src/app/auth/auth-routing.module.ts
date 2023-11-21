import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { AuthLayoutComponent } from './auth-layout.component';
import { TwoFactorAuthComponent } from './login-form/two-factor-auth/two-factor-auth.component';
const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    { path: '', component: LoginFormComponent},
    { path: 'login', component: LoginFormComponent},
    { path: 'logout', component: LoginFormComponent},
    { path: 'mfa', component: TwoFactorAuthComponent},
    { path: 'forgot-password', component: ForgotPasswordFormComponent},
    { path: 'reset-password', component: ResetPasswordFormComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
