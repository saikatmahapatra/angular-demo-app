/**
 * Shared module: for our commonly used shared components.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ValidationErrorComponent,
  ScrollToTopComponent,
  HeaderComponent,
  FooterComponent
} from './components';

import {
  HighlightDirective,
  CheckCapsLockDirective
} from './directives';

import {
  ExponentialStrengthPipe,
  MaskPipe,
  OrderByPipe
} from './pipes';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { UnauthenticatedLayoutComponent } from './components/layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    ValidationErrorComponent,
    ScrollToTopComponent,
    CheckCapsLockDirective,
    HeaderComponent,
    FooterComponent,
    DefaultLayoutComponent,
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent
  ],
  providers: [],
  exports: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    ValidationErrorComponent,
    HeaderComponent,
    FooterComponent,
    DefaultLayoutComponent,
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent
  ]
})
export class SharedModule {
}
