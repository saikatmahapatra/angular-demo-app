import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentLayoutComponent } from './payment-layout.component';
import { AutopayComponent } from './autopay/autopay.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { AppService } from 'app/services';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PaymentRoutingModule,
    SharedModule
  ],
  providers: [
    AppService
  ],
  declarations: [
    PaymentLayoutComponent,
    AutopayComponent,
    PaymentHistoryComponent
  ],
  entryComponents: [
    AutopayComponent,
    PaymentHistoryComponent
  ]
})
export class PaymentModule { }
