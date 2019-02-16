import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HighlightDirective } from './common-directives/highlight.directive';
import { ExponentialStrengthPipe } from './common-pipes/exponential-strength.pipe';
import { MaskPipe } from './common-pipes/mask.pipe';
import { OrderByPipe } from './common-pipes/order-by.pipe';
import { CommonService } from './common-services/common.service';
import { ValidationErrorComponent } from './common-components/validation-error/validation-error.component';
import { HeaderDefaultComponent } from './common-components/header-default/header-default.component';
import { NavDefaultComponent } from './common-components/nav-default/nav-default.component';
import { FooterDefaultComponent } from './common-components/footer-default/footer-default.component';
import { SidebarLeftDefaultComponent } from './common-components/sidebar-left-default/sidebar-left-default.component';
import { SidebarRightDefaultComponent } from './common-components/sidebar-right-default/sidebar-right-default.component';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ScrollToTopComponent } from './common-components/scroll-to-top/scroll-to-top.component';
import { CheckCapsLockDirective } from './common-directives/check-caps-lock.directive';

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
    SharedComponent,
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    ValidationErrorComponent,
    HeaderDefaultComponent,
    NavDefaultComponent,
    FooterDefaultComponent,
    SidebarLeftDefaultComponent,
    SidebarRightDefaultComponent,
    ScrollToTopComponent,
    CheckCapsLockDirective
  ],
  providers: [

  ],
  exports: [
    HeaderDefaultComponent,
    NavDefaultComponent,
    FooterDefaultComponent,
    SidebarLeftDefaultComponent,
    SidebarRightDefaultComponent,
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    ValidationErrorComponent
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
