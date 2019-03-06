import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedRoutingModule } from './shared-routing.module';

import{
  HighlightDirective,
  CheckCapsLockDirective
} from './common-directives/index';

import{
  ExponentialStrengthPipe,
  MaskPipe,
  OrderByPipe
} from './common-pipes/index';

import {
  ValidationErrorComponent,
  ScrollToTopComponent,
  DefaultHeaderComponent,
  DefaultNavComponent,
  DefaultFooterComponent
} from './common-components/index';

import {
  CommonService
} from './common-services/index';


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
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DefaultNavComponent
  ],
  providers: [

  ],
  exports: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    ValidationErrorComponent,
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DefaultNavComponent
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
        CommonService
      ]
    };
  }
}
