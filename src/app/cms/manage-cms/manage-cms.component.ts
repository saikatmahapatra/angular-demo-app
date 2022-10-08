import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
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
    { headerName: 'Action', field: '', resizable: false, cellRenderer: this.cellRendererRowAction }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  totalRecords: any;

  constructor(
    private apiSvc: ApiService
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

  cellRendererRowAction(params: ICellRendererParams) {
    let htmlElement = '';
    htmlElement += '<button class="btn btn-light" type="button"><span class="material-symbols-outlined align-middle">edit</span></button>';
    htmlElement += '<button class="btn btn-light" type="button"><span class="material-symbols-outlined align-middle">delete</span></button>';
    return htmlElement;
  }


}
