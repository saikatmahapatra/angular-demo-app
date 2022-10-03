import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-timesheet-grid',
  templateUrl: './view-timesheet-grid.component.html',
  styleUrls: ['./view-timesheet-grid.component.scss']
})
export class ViewTimesheetGridComponent implements OnInit {

  @Input() dataRow!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
