import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copy = '';
  appVersion = '';
  buildTimestamp = '';
  constructor() { }

  ngOnInit() {
    this.copy = AppConfig.copyrightInfo;
    this.appVersion = AppConfig.version;
    this.buildTimestamp = AppConfig.timestamp;
  }

}
