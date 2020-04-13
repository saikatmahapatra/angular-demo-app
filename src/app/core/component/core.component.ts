import { Component, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html'
})
export class CoreComponent implements OnInit, AfterViewInit {

  loaded = false;

  constructor(
    private route: ActivatedRoute,
    private changeDect: ChangeDetectorRef,
    private appService: AppService,
  ) {}

  ngOnInit() {
    this.appService.someMethod();
  }

  ngAfterViewInit() {
    console.log('=======>ngAfterViewInit');
    this.appService.componentLoaded.subscribe((data) => {
      console.log('ngAfterViewInit===>', data);
      this.loaded = data;
      this.changeDect.detectChanges();
    });
  }

}
