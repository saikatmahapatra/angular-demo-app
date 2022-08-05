import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class SpinnerService {
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  getSpinner(): Observable<boolean> {
    return this.showSpinner.asObservable();
  }

  show() {
    this.showSpinner.next(true);
  }

  hide() {
    this.showSpinner.next(false);
  }
}
