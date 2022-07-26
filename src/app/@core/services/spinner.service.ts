import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class SpinnerService {
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
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  show() {
    this.subject.next({ showLoader: true });
  }

  hide() {
    this.subject.next({ showLoader: false });
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.next({});
  }
}
