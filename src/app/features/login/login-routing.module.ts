import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
const routes: Routes = [{
    path: '', component: LoginComponent,
    children: [
      { path: 'login', component: LoginFormComponent},
      { path: 'forgot-password', component: ForgotPasswordFormComponent},
      { path: 'reset-password', component: ResetPasswordFormComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
