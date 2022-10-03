import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-view-timesheet',
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.scss']
})
export class ViewTimesheetComponent implements OnInit {
  timesheetData: any = [];
  columnDefs: ColDef[] = [
    { headerName: 'Date', field: 'timesheet_date', resizable: true },
    { headerName: 'Project Name', field: 'project_name', resizable: true },
    { headerName: 'Task Name', field: 'task_name', resizable: true },
    { headerName: 'Hours', field: 'task_name', resizable: true },
    { headerName: 'Descr.', field: 'task_name', resizable: true }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  rowData$!: Observable<any[]>;

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthService

  ) { }

  ngOnInit(): void {
    this.timesheetData();
  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }
  
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  getTimesheetData() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('userId', this.authSvc.getUserId());
    let options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getTimesheet, options).subscribe((response: any) => {
      this.timesheetData = response;
    });
  }
}
