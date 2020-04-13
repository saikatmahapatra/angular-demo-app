import {
  PaymentStep,
  PaymentState,
  Reducers
} from '../../models';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



const paymentState: PaymentState = {
  paymentStep: undefined,
  error: undefined
};

export default <Reducers> {

  'PAYMENT_INITIALIZED': function (state, { value: { refreshFlag: refreshFlag } }, callback) {
    if (!refreshFlag && state.paymentState && state.paymentState.paymentStep) {
      return callback(state);
    }
    state.paymentState = paymentState;
    this.appService.componentLoaded.emit(false);
    state.paymentState.paymentStep = PaymentStep.PAYMENT_INPUT;
    callback(state);
  }
};

function errorHandler(error): Observable<{ error: string }> {
  let message = '';
  try {
    switch (error.status) {
      case 401:
        message = 'Error 401';
        break;
      case 403:
        message = 'Error 401';
        break;
      case 500:
        message = message = 'Error 500';
        break;
      default:
        message = 'Error Occured while processing your request';
    }
    if (!message) {
      message = 'We encountered a problem processing your request. Please try again later.';
    }
  } catch (e) { }
  return from([{ error: message }]);
}
