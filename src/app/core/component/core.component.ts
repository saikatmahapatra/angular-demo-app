import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html'
})
export class CoreComponent implements OnInit, AfterViewInit {

  loaded: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _changeDect: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
