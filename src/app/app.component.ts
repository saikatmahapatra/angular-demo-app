import { Component, VERSION, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { AppService } from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  version = VERSION;
  loaded = false;

  constructor(
    private appService: AppService,
    private changeDect: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.appService.someMethod();
  }

  ngAfterViewInit() {
    console.log('app.component.ts:ngAfterViewInit called');
    this.appService.componentLoaded.subscribe((data) => {
      console.log('app.component.ts:ngAfterViewInit: ', data);
      this.loaded = data;
      this.changeDect.detectChanges();
    });
  }
}
