import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedRoutingModule } from './shared-routing.module';

import{
  HighlightDirective,
  CheckCapsLockDirective
} from './directives/index';

import{
  ExponentialStrengthPipe,
  MaskPipe,
  OrderByPipe
} from './pipes/index';

import {
  ValidationErrorComponent,
  ScrollToTopComponent,
  HeaderComponent,
  NavbarComponent,
  FooterComponent
} from './components/index';

import {
  AppService
} from './services/index';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedRoutingModule,
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
  providers: [

  ],
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
  /**
   * IMPORTANT:
   * SharedModule.forRoot() must be used in AppModule only to ensure all the providers are included at the time of bootstrap.
   * Other child modules should include SharedModule directly.
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AppService
      ]
    };
  }
}
