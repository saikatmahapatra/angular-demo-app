import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentLayoutComponent } from './payment-layout.component';

const routes: Routes = [{
  path: '',
  component: PaymentLayoutComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class PaymentRoutingModule { }
