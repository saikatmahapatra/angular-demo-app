import { Component, VERSION, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { CommonService } from './@core/services/common.service';
import { Router, Event, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { LoadingService } from './@core/services/loading.service';
import { delay } from 'rxjs/operators';
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
    private commonSvc: CommonService,
    private changeDect: ChangeDetectorRef,
    private router: Router,
    private loadingSvc: LoadingService
  ) {
    this.router.events.subscribe((event: Event) => {
      //console.log('Router Event', event);
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.commonSvc.someMethod();
    this.checkLoadingSvc();
  }

  checkLoadingSvc() {
    this.loadingSvc.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
