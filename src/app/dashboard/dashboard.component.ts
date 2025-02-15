import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/@core/services/alert.service';
import { CommonService } from '../@core/services/common.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  constructor(private commonSvc: CommonService,) {
    this.commonSvc.setTitle('Dashboard');
  }
  ngOnInit(): void {
    
  }

}
