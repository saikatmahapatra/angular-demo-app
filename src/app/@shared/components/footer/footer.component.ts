import { Component, OnInit, AfterViewInit, ViewChild, VERSION } from '@angular/core';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  version = VERSION;
  copy = '';
  appVersion = '';
  constructor() { }

  ngOnInit() {
    this.copy = AppConfig.copyrightInfo;
    this.appVersion = AppConfig.version +' Based '+this.version.full;

  }

}
