import { Component, OnInit } from '@angular/core';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit {
  copy = '';
  appVersion = '';
  buildTimestamp = '';
  constructor() { }

  ngOnInit() {
    this.copy = CustomAppConfig.copyrightInfo;
    this.appVersion = CustomAppConfig.version;
    this.buildTimestamp = CustomAppConfig.timestamp;
  }

}
