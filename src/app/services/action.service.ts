import { Action } from 'app/models';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * The `ActionsService` is used by components to inform the rest of the
 * application of a user action that will result in the generation of a new
 * application state. For example, that the user has submitted their answers
 * to a questionnaire or that the user has made a selection.
 */
@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor() { }

  /**
   * Internal property for representing received actions as an RxJS Subject
   */
  private _stream: Subject<Action> = new Subject<Action>();

  /**
   * Public property for allowing observation of the received actions
   */
  readonly stream: Observable<Action> = this._stream.asObservable();

  /**
   * Public method used by components to send an action to the service
   * @param {Action} action The action to send through the service.
   */
  public send(action): void {
    this._stream.next(action);
  }


  /**
   * Internal property for representing received post message actions as an RxJS Subject
   */
  private _postStream: Subject<Action> = new Subject<Action>();

  /**
   * Public property for allowing observation of the received post message actions
   */
  readonly postStream: Observable<Action> = this._postStream.asObservable();

  /**
   * Public method used by components to send an post message action to the service
   * @param {Action} action The post message action to send through the service.
   */
  public postMessage(action): void {
    this._postStream.next(action);
  }
}
