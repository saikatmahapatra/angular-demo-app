import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HighlightDirective } from './directives/highlight.directive';
import { ExponentialStrengthPipe } from './pipes/exponential-strength.pipe';
import { MaskPipe } from './pipes/mask.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CommonService } from './services/common.service';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { HeaderDefaultComponent } from './layouts/header-default/header-default.component';
import { NavDefaultComponent } from './layouts/nav-default/nav-default.component';
import { FooterDefaultComponent } from './layouts/footer-default/footer-default.component';
import { SidebarLeftDefaultComponent } from './layouts/sidebar-left-default/sidebar-left-default.component';
import { SidebarRightDefaultComponent } from './layouts/sidebar-right-default/sidebar-right-default.component';

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
    HeaderDefaultComponent,
    NavDefaultComponent,
    FooterDefaultComponent,
    SidebarLeftDefaultComponent,
    SidebarRightDefaultComponent
  ],
  providers: [],
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
