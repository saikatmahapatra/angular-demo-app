import { Component, OnInit, Renderer2 } from '@angular/core';
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
    { headerName: 'Action', field: '', resizable: false, cellRenderer: this.cellRendererActionButton }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  totalRecords: any;

  constructor(
    public apiSvc: ApiService,
    private renderer: Renderer2
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

  cellRendererActionButton(params: ICellRendererParams) {
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('class', 'btn btn-sm btn-light');
    btn.innerHTML = 'Edit';
    btn.addEventListener('click', function(){ 
      console.log(params.data);
    })
    return btn;
  }

}
