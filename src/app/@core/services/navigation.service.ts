import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public showNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  getShowNav() {
    return this.showNav$.asObservable();
  }

  showNav() {
    this.showNav$.next(true);
  }

  hideNav() {
    this.showNav$.next(false);
  }

  toggleNavState() {
    this.showNav$.next(!this.showNav$.value);
  }

  isNavOpen() {
    return this.showNav$.value;
  }
}
