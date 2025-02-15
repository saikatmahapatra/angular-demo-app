import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-ag-grid-table-example',
    templateUrl: './ag-grid-table-example.component.html',
    styleUrls: ['./ag-grid-table-example.component.scss'],
    standalone: false
})

export class AgGridTableExampleComponent implements OnInit {
  // Grid Options, Settings
  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { headerName: 'Manufacturer', field: 'make', resizable: true },
    { headerName: 'Model Name', field: 'model', resizable: true },
    { headerName: 'Price', field: 'price', resizable: true }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }


  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}
