import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  HighlightDirective,
  CheckCapsLockDirective
} from './directives';

import {
  ExponentialStrengthPipe,
  MaskPipe,
  OrderByPipe
} from './pipes';

import {
  ValidationErrorComponent,
  ScrollToTopComponent,
  HeaderComponent,
  NavbarComponent,
  FooterComponent
} from './components';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
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
    NavbarComponent
  ],
  providers: [],
  exports: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    ValidationErrorComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule {
}
