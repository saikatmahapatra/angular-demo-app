import { Component } from '@angular/core';
import { CommonService } from '../@core/services/common.service';

@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss']
})
export class SettingsLayoutComponent {
  constructor(private commonSvc: CommonService,) {
    this.commonSvc.setTitle('Site Settings');
    
  }
}
