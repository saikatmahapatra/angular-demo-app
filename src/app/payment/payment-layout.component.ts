import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentChecked,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { AppService, DynamicComponentService } from '../services';

import { PaymentInputComponent } from './payment-input/payment-input.component';
import { PaymentVerifyComponent } from './payment-verify/payment-verify.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { OnlinepaymentOffersComponent } from './onlinepayment-offers/onlinepayment-offers.component';

// Component Registry. Component Alias: Component Class
const componentRegistry = {
  'payment_offers': OnlinepaymentOffersComponent,
  'init_payment': PaymentInputComponent
};

// In which layout block/pagelet block which component alias to load
const componentList = {
  'cubbyPglt': [],
  'marqueePglt': [],
  'navigationPglt': [],
  'heroPglt': ['payment_offers'],
  'mainPglt': [
    'init_payment',
    'payment_offers'
  ],
  'utilityPglt': ['payment_offers']
};

@Component({
  selector: 'app-payment-layout',
  templateUrl: './payment-layout.component.html'
})
export class PaymentLayoutComponent implements OnInit {
  @ViewChild('marquee', { read: ViewContainerRef }) marqueePglt: ViewContainerRef;
  @ViewChild('hero', { read: ViewContainerRef }) heroPglt: ViewContainerRef;
  @ViewChild('main', { read: ViewContainerRef }) mainPglt: ViewContainerRef;
  @ViewChild('utility', { read: ViewContainerRef }) utilityPglt: ViewContainerRef;

  constructor(
    private _appService: AppService,
    private _dynamicComponentService: DynamicComponentService
    ) { }

  ngOnInit() {
    this.loadComponents();
  }

  loadComponents() {
    this._dynamicComponentService.loadComponent('authLayout', componentList, componentRegistry, this);
  }

}
