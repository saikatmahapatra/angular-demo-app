import { Component, OnInit } from '@angular/core';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-cms',
  templateUrl: './manage-cms.component.html',
  styleUrls: ['./manage-cms.component.scss']
})
export class ManageCmsComponent implements OnInit {
  dataRow = [];
  columnDefs: ColDef[] = [
    { headerName: 'Title', field: 'content_title', resizable: true },
    { headerName: 'Type', field: 'content_type', resizable: true },
    { headerName: 'Created On', field: 'content_created_on', resizable: true },
    //{ headerName: 'Updated On', field: 'content_updated_on', resizable: true },
    { headerName: 'Created By', field: 'content_created_by', resizable: true, cellRenderer: this.cellRendererCreatedBy },
    { headerName: 'Status', field: 'content_status', resizable: true },
    { headerName: 'Action', field: '', resizable: false, cellRenderer: cellRendererActionButtons }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  totalRecords: any;

  constructor(
    public apiSvc: ApiService
  ) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents() {
    this.apiSvc.get(AppConfig.apiUrl.getContents).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
    });
  }

  cellRendererCreatedBy(params: ICellRendererParams) {
    return params.data?.user_firstname + ' ' + params.data?.user_lastname;
  }

}

@Component({
  selector: 'app-cell-renderer-action-buttons',
  template: `
    <button class="btn btn-light" (click)="editRowData()">Edit</button>
    <button class="btn btn-light" (click)="deleteRowData()">Delete</button>
  `
})

export class cellRendererActionButtons extends ManageCmsComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  // gets called whenever the cell refreshes
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    return true;
  }

  editRowData() {
    console.log(this.params);
  }

  deleteRowData() {
    console.log(this.params);
  }
}