import { Component, VERSION, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { CommonService } from './@core/services/common.service';
import { Router, Event, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { delay } from 'rxjs/operators';
import { SpinnerService } from './@core/services/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls : ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  version = VERSION;
  loading = false;

  constructor(
    private router: Router,
    private spinnerSvc: SpinnerService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      switch (true) {
        case event instanceof NavigationStart: {
          this.spinnerSvc.show();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.spinnerSvc.hide();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.checkSpinner();
  }

  checkSpinner() {
    this.spinnerSvc.getSpinner()
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((val: any) => {
        this.loading = val;
      });
  }
}
