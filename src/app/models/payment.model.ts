export interface PaymentState {
  paymentStep?: PaymentStep;
  error?: string;
  paymentInputFormData?: PaymentInputFormData;

}

export enum PaymentStep {
  PAYMENT_INPUT = 'INPUT',
  PAYMENT_VERIFY = 'VERIFY',
  PAYMENT_CONFIRM = 'CONFIRM'
}

export interface PaymentInputFormData {
  amount?: 'string'
}
