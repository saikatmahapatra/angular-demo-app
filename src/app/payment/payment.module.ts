import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentLayoutComponent } from './payment-layout.component';
import { AppService, DynamicComponentService } from '../services';

import {
  PaymentComponent,
  PaymentInputComponent,
  PaymentVerifyComponent,
  PaymentConfirmComponent,
  OnlinepaymentOffersComponent
 } from './index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PaymentRoutingModule,
    SharedModule
  ],
  providers: [
    AppService,
    DynamicComponentService
  ],
  declarations: [
    PaymentLayoutComponent,
    PaymentInputComponent,
    PaymentVerifyComponent,
    PaymentConfirmComponent,
    OnlinepaymentOffersComponent,
    PaymentComponent
  ],
  entryComponents: [
    PaymentComponent,
    PaymentInputComponent,
    PaymentVerifyComponent,
    PaymentConfirmComponent,
    OnlinepaymentOffersComponent
  ]
})
export class PaymentModule { }
