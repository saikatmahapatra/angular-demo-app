import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer-default',
  templateUrl: './footer-default.component.html',
  styleUrls: ['./footer-default.component.scss']
})
export class FooterDefaultComponent implements OnInit {
  version = VERSION;
  constructor() { }

  ngOnInit() {
  }

}
