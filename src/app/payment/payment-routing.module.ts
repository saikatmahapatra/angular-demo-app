import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentLayoutComponent } from './payment-layout.component';

const router: Routes = [{
  path: '',
  component: PaymentLayoutComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
})
export class PaymentRoutingModule { }
