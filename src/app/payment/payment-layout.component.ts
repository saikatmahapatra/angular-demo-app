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
import { AutopayComponent } from './autopay/autopay.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

// Component Registry. Component Alias: Component Class
const componentRegistry = {
  'autopay_comp': AutopayComponent,
  'payment_history_comp': PaymentHistoryComponent
};

// In which layout block/pagelet block which component alias to load
const componentList = {
  'cubbyPglt': [],
  'marqueePglt': [],
  'navigationPglt': [],
  'heroPglt': ['autopay_comp'],
  'mainPglt': [
    'autopay_comp',
    'payment_history_comp'
  ],
  'utilityPglt': ['payment_history_comp']
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
