import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './directives/highlight.directive';
import { CheckCapsLockDirective } from './directives/check-caps-lock.directive';
import { ExponentialStrengthPipe } from './pipes/exponential-strength.pipe';
import { MaskPipe } from './pipes/mask.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { UnauthenticatedLayoutComponent } from './components/layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { MaterialUiModule } from './modules/material-ui/material-ui.module';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule
  ],
  declarations: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    CheckCapsLockDirective,
    NavbarComponent,
    FooterComponent,
    ValidationErrorComponent,
    DefaultLayoutComponent,
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent,
    AlertMessageComponent,
    SidenavComponent,
    LoadingIndicatorComponent
  ],
  providers: [],
  exports: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    CheckCapsLockDirective,
    NavbarComponent,
    FooterComponent,
    ValidationErrorComponent,
    DefaultLayoutComponent,
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent,
    AlertMessageComponent,
    SidenavComponent,
    MaterialUiModule,
    LoadingIndicatorComponent
  ]
})
export class SharedModule {
}
