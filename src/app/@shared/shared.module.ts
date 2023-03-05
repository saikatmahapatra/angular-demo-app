import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './directives/highlight.directive';
import { CheckCapsLockDirective } from './directives/check-caps-lock.directive';
import { ExponentialStrengthPipe } from './pipes/exponential-strength.pipe';
import { MaskPipe } from './pipes/mask.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { UnauthenticatedLayoutComponent } from './components/layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { StatusIndicatorDirective } from './directives/status-indicator.directive';
import { ThemeSwitchComponent } from './component/theme-switch/theme-switch.component';
import { IconComponent } from './components/icon/icon.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    CheckCapsLockDirective,
    HeaderComponent,
    FooterComponent,
    ValidationErrorComponent,
    DefaultLayoutComponent,
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent,
    AlertMessageComponent,
    SidebarComponent,
    LoaderComponent,
    UiButtonComponent,
    SearchInputComponent,
    PaginationComponent,
    FileUploadComponent,
    StatusIndicatorDirective,
    ThemeSwitchComponent,
    IconComponent,
    CookieConsentComponent,
    ScrollToTopComponent
  ],
  providers: [],
  exports: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    CheckCapsLockDirective,
    HeaderComponent,
    FooterComponent,
    ValidationErrorComponent,
    DefaultLayoutComponent,
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent,
    AlertMessageComponent,
    SidebarComponent,
    LoaderComponent,
    UiButtonComponent,
    SearchInputComponent,
    PaginationComponent,
    FileUploadComponent,
    StatusIndicatorDirective,
    ThemeSwitchComponent,
    IconComponent,
    CookieConsentComponent,
    ScrollToTopComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
