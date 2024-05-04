import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clearAlert();
        }
      }
    });
  }

  setAlert(type: string, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: type, summary: type, text: message });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  clearAlert() {
    // clear by calling subject.next() without parameters
    this.subject.next({});
  }
}
