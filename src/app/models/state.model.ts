import { ElementRef } from '@angular/core';
import { SessionState,
         PaymentState
        } from '../models';

/**
 * Event type for actions that will result in a new application state
 */
export interface Action {
  type: string;
  value?: any;
};

/**
 * Call signature for a reducer function that will pass a new application state
 * to the reducer callback
 */
export type Reducer = {
  (state, action, callback: ReducerCallback): void;
};

/**
 * Call signature for the callback function that is passed to reducers
 */
export type ReducerCallback = (state: State) => void;

/**
 * Type definition for a collection of reducers where the key name matches the
 * action type to apply the reducer function to
 */
export type Reducers = {
  [actionType: string]: Reducer;
};

/**
 * The state model for the entire application
 */
export type State = {
  focusedElement: ElementRef,
  session: SessionState,
  paymentState?: PaymentState,
};
