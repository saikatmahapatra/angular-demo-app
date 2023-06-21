import { Component, OnInit } from '@angular/core';
import { CommonService } from '../@core/services/common.service';

@Component({
  selector: 'app-timesheet-layout',
  templateUrl: './timesheet-layout.component.html',
  styleUrls: ['./timesheet-layout.component.scss']
})
export class TimesheetLayoutComponent implements OnInit {

  constructor(private commonSvc: CommonService) { 
    this.commonSvc.setTitle('Timesheet');
  }

  ngOnInit(): void {
  }

}
