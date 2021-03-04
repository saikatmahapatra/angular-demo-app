import { Component, VERSION, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { AppService } from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  version = VERSION;
  loaded = false;

  constructor(
    private appService: AppService,
    private changeDect: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appService.someMethod();
    this.loaded = true;
    console.log('loaded = ' + this.loaded);
    // this.appService.componentLoaded.subscribe((data: any) => {
    //   console.log('loaded in subscribe = ' + data);
    //   this.loaded = data;
    //   this.changeDect.detectChanges();
    // });
  }
}
