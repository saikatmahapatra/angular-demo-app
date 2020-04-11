import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentLayoutComponent } from './payment-layout.component';
import { AppService, DynamicComponentService } from '../services';
import { PaymentInputComponent } from './payment-input/payment-input.component';
import { PaymentVerifyComponent } from './payment-verify/payment-verify.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { OnlinepaymentOffersComponent } from './onlinepayment-offers/onlinepayment-offers.component';
import { PaymentComponent } from './payment.component';
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
    PaymentLayoutComponent,
    PaymentInputComponent,
    PaymentVerifyComponent,
    PaymentConfirmComponent,
    OnlinepaymentOffersComponent
  ]
})
export class PaymentModule { }
