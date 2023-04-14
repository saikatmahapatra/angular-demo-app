import { Component, VERSION, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { CommonService } from './@core/services/common.service';
import { Router, Event, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoaderService } from './@core/services/loader.service';
import { Meta, Title } from "@angular/platform-browser";
import { AppConfig } from './@utils/const/app.config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  version = VERSION;
  loading = false;

  constructor(
    private router: Router,
    private loader: LoaderService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.titleService.setTitle(AppConfig?.title || 'App');
    
    if(AppConfig.production) {
      this.meta.addTags([
        { name: 'description', content: 'Employee Portal of United Exploration India Private Limited. United Exploration India Private Limited delivers GIS, Remote Sensing and Minining Services across India and overseas.' }
      ]); 
    }

    this.router.events.subscribe((event: Event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
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
