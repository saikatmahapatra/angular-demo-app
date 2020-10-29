import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentChecked,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import {
  AppService,
  DynamicComponentService,
  //ActionsService,
  //StateService,
  //SessionService
} from '../services';
//import paymentActions from './actions';
import { PaymentComponent } from './payment.component';
import { PaymentInputComponent } from './payment-input/payment-input.component';
import { PaymentVerifyComponent } from './payment-verify/payment-verify.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { OnlinepaymentOffersComponent } from './onlinepayment-offers/onlinepayment-offers.component';

// Component Registry. Component Alias: Component Class
const componentRegistry = {
  'payment': PaymentComponent
};

// In which layout block/pagelet block which component alias to load
const componentList = {
  'cubbyPglt': [],
  'marqueePglt': [],
  'navigationPglt': [],
  'heroPglt': [],
  'mainPglt': ['payment'],
  'utilityPglt': []
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
    private appService: AppService,
    private dynamicComponentService: DynamicComponentService,
    //private actions: ActionsService,
    p//rivate stateService: StateService,
    ) { }

  data: any;
  globalData: any;
  isLoaded = false;
  state: any;

  ngOnInit() {
    //this.stateService.addReducers(paymentActions, 'payments');
    this.loadComponents();
    // this.stateService.states
    // .subscribe(state => {
    //   this.state = state;
    //   console.log(state);
    //   if (state) {
    //     this.actions.send({
    //       type: 'PAYMENT_INITIALIZED',
    //       value: {
    //         refreshFlag: false
    //       }
    //     });
    //   }
    // });
  }

  loadComponents() {
    this.dynamicComponentService.loadComponent('authLayout', componentList, componentRegistry, this);
  }

}
