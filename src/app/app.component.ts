import { Component, VERSION, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { CommonService } from './core/services/common.service';
import { Router, Event, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls : ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  version = VERSION;
  loaded = false;

  constructor(
    private commonSvc: CommonService,
    private changeDect: ChangeDetectorRef,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      //console.log('Router Event', event);
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaded = false;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loaded = true;
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
  }
}
