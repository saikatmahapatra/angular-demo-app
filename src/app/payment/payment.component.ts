import {
  Component,
  OnInit,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  ActionsService,
  StateService
} from '../services';

import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PaymentStep } from '../models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  host: { 'data-host': 'host' }
})
export class PaymentComponent implements OnInit {

  moduleLoaded = false;
  errormessage: string = 'This module is temporarily unavailable';
  componentName: string = 'payment';
  paymentStep = PaymentStep;
  currentPaymentStep: any = undefined;
  state: any;

  constructor(
    private actions: ActionsService,
    private route: ActivatedRoute,
    // private session: SessionService,
    private stateService: StateService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.stateService.states
    .subscribe(state => {
      this.state = state;
      if (state && state.paymentState && state.paymentState.paymentStep ) {
        this.currentPaymentStep = state.paymentState.paymentStep;
        this.moduleLoaded = true;
      }
    });
  }

}
