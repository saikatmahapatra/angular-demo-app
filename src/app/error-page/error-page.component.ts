import { Component, OnInit } from '@angular/core';
import { CommonService } from '../@core/services/common.service';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss'],
    standalone: false
})
export class ErrorPageComponent implements OnInit {

  constructor(private commonSvc: CommonService) { 
    this.commonSvc.setTitle('Error');
  }

  ngOnInit(): void {
  }

}
