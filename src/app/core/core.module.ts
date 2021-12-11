import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthenticatedLayoutComponent } from './layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';



@NgModule({
  declarations: [
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent,
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent,
    DefaultLayoutComponent
  ]
})
export class CoreModule { }
