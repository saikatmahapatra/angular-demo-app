import {
  Component,
  OnInit,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

// import {
//   ActionsService,
//   PaymentService,
//   SessionService,
//   StateService
// } from '../services';

import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
//import { PaymentStep } from '../../models';

@Component({
  selector: 'app-payment-input',
  templateUrl: './payment-input.component.html',
  host: { 'data-host': 'host' }
})
export class PaymentInputComponent implements OnInit {

  moduleLoaded = false;
  errormessage: string = 'This module is temporarily unavailable';
  componentName: string = 'payment';
  paymentStep = 'INPUT'; // INPUT|VERIFY|CONFIRM
  currentPaymentStep: any = undefined;
  state: any;

  constructor() { }

  ngOnInit() {
    this.moduleLoaded = true;
  }

  submitForm() {
    this.currentPaymentStep = 'VERIFY';
  }

}
