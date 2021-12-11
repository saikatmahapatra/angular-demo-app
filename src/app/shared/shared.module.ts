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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MenuListItemComponent } from './utils/ui/menu-list-item/menu-list-item.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
    
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
    AuthenticatedLayoutComponent,
    MenuListItemComponent,
    AlertMessageComponent
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
    AuthenticatedLayoutComponent,
    AlertMessageComponent
  ]
})
export class SharedModule {
}
