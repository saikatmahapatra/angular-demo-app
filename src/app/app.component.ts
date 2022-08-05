import { Component, VERSION, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { CommonService } from './@core/services/common.service';
import { Router, Event, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoaderService } from './@core/services/loader.service';
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
    private loader: LoaderService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      switch (true) {
        case event instanceof NavigationStart: {
          this.loader.show();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loader.hide();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
  }
}
