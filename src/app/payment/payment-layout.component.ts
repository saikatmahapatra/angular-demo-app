import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentChecked,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { DynamicComponentLoaderService } from '../shared/common-services/dynamic-component-loader.service';
import { AutopayComponent } from './autopay/autopay.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

const componentRegistry = {
  'autopay_comp': AutopayComponent,
  'payment_history_comp': PaymentHistoryComponent
};

const globalData = {
  'eligibleModules': {
    'cubby': [],
    'heroPglt': ['autopay_comp'],
    'mainPglt': [
      'autopay_comp',
      'payment_history_comp'
    ],
    'marqueePglt': [],
    'navigationPglt': [],
    'utilityPglt': []
  }
};

@Component({
  selector: 'app-payment-layout',
  templateUrl: './payment-layout.component.html',
  styleUrls: ['./payment-layout.component.scss']
})
export class PaymentLayoutComponent implements OnInit {
  @ViewChild('marquee', { read: ViewContainerRef }) marqueePglt: ViewContainerRef;
  @ViewChild('hero', { read: ViewContainerRef }) heroPglt: ViewContainerRef;
  @ViewChild('main', { read: ViewContainerRef }) mainPglt: ViewContainerRef;
  @ViewChild('utility', { read: ViewContainerRef }) utilityPglt: ViewContainerRef;

  constructor(private _dynamicComponent: DynamicComponentLoaderService) { }

  ngOnInit() {
    this._dynamicComponent.loadComponent('authLayout', globalData, componentRegistry, this);
  }

}
