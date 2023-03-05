import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {

  @HostListener('scroll') scrolling(){
    console.log('scrolling');
  }

  @HostListener('click') clicking(){
    console.log('clicking...');
  }

  constructor() { }

  ngOnInit() {
  }

}
