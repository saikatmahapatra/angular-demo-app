import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentChecked,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { AppService } from 'app/services';
import { AutopayComponent } from './autopay/autopay.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

// Component Registry. Component Alias: Component Class
const componentRegistry = {
  'autopay_comp': AutopayComponent,
  'payment_history_comp': PaymentHistoryComponent
};

// In which layout block/pagelet block which component alias to load
const eligibleModulesAtLayoutBlock = {
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
  templateUrl: './payment-layout.component.html',
  styleUrls: ['./payment-layout.component.scss']
})
export class PaymentLayoutComponent implements OnInit {
  @ViewChild('marquee', { read: ViewContainerRef }) marqueePglt: ViewContainerRef;
  @ViewChild('hero', { read: ViewContainerRef }) heroPglt: ViewContainerRef;
  @ViewChild('main', { read: ViewContainerRef }) mainPglt: ViewContainerRef;
  @ViewChild('utility', { read: ViewContainerRef }) utilityPglt: ViewContainerRef;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.loadComponents();
  }

  loadComponents() {
    this._appService.loadComponent('authLayout', eligibleModulesAtLayoutBlock, componentRegistry, this);
  }

}
